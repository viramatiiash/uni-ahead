import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  Modifier,
  CompositeDecorator,
  convertToRaw,
  getDefaultKeyBinding,
  KeyBindingUtil,
  ContentState,
  ContentBlock,
} from "draft-js";
import { convertFromRaw } from "draft-js";
import "draft-js/dist/Draft.css";
import { FONT_SIZES, customStyleMap } from "./editorStyles";
import styles from "./TextEditor.module.scss";
import classNames from "classnames";

import TickIcon from "@assets/icons/tick.svg";

const { hasCommandModifier } = KeyBindingUtil;


const SvgSpan = (props: any) => {
  const { svg } = props.contentState.getEntity(props.entityKey).getData();
  return (
    <span
      dangerouslySetInnerHTML={{ __html: svg }}
      style={{
        display: "inline-block",
        width: "16px",
        height: "16px",
      }}
      className={styles.tick}
    />
  );
};

const findSvgEntities = (
  contentBlock: ContentBlock,
  callback: (start: number, end: number) => void,
  contentState: ContentState
) => {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === "SVG_ICON"
    );
  }, callback);
};


type TextEditorProps = {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
};

export const TextEditor: React.FC<TextEditorProps> = ({ value, onChange, maxLength }) => {
  const decorator = useMemo(
    () =>
      new CompositeDecorator([
        {
          strategy: findSvgEntities,
          component: SvgSpan,
        },
      ]),
    []
  );

  

  const FONT_SIZE_STYLES = useMemo(
    () => FONT_SIZES.map((size) => `FONT_${size.value.replace("px", "")}`),
    []
  );

  const [editorState, setEditorState] = useState(
    EditorState.createEmpty(decorator)
  );
  const [activeFontSize, setActiveFontSize] = useState("16px");


  const handleBeforeInput = (chars: string, editorState: EditorState) => {
    const currentContent = editorState.getCurrentContent();
    const currentText = currentContent.getPlainText();

    if (maxLength !== undefined && currentText.length >= maxLength) {
      return "handled";
    }

    return "not-handled";
  };

  const handlePastedText = (
    text: string,
    html: string | undefined,
    editorState: EditorState
  ) => {
    const currentLength = editorState.getCurrentContent().getPlainText().length;

    if (maxLength !== undefined && currentLength + text.length > maxLength) {
      return "handled"; 
    }

    return "not-handled"; 
  };


  useEffect(() => {
    if (!value) return;

    const currentContent = editorState.getCurrentContent();
    const isEmpty = !currentContent.hasText();

    if (!isEmpty) return; 

    try {
      const parsed = JSON.parse(value);
      if (parsed?.blocks && parsed?.entityMap !== undefined) {
        const contentState = convertFromRaw(parsed);
        const newEditorState = EditorState.createWithContent(
          contentState,
          decorator
        );
        setEditorState(newEditorState);
      } else {
        throw new Error("Invalid draft structure");
      }
    } catch (e) {
      console.warn("Falling back to plain text", e);
      const contentState = ContentState.createFromText(value);
      const newEditorState = EditorState.createWithContent(
        contentState,
        decorator
      );
      setEditorState(newEditorState);
    }
  }, [value]);

  useEffect(() => {
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      const currentStyle = editorState.getCurrentInlineStyle();
      const fontSizeStyle = [...currentStyle].find((style) =>
        style.startsWith("FONT_")
      );

      if (fontSizeStyle) {
        const px = fontSizeStyle.replace("FONT_", "") + "px";
        setActiveFontSize(px);
      } else {
        setActiveFontSize("16px");
      }
    }
  }, [editorState]);
  
useEffect(() => {
  const content = editorState.getCurrentContent();
  if (!content.hasText()) return; 

  const raw = convertToRaw(content);
  const newValue = JSON.stringify(raw);

  if (newValue !== value) {
    onChange(newValue);
  }
}, [editorState]);

  const removeInlineStyles = (
    editorState: EditorState,
    stylesToRemove: string[]
  ) => {
    const selection = editorState.getSelection();
    let contentState = editorState.getCurrentContent();

    stylesToRemove.forEach((style) => {
      contentState = Modifier.removeInlineStyle(contentState, selection, style);
    });

    return EditorState.push(editorState, contentState, "change-inline-style");
  };

  const handleChange = (state: EditorState) => {
    if (maxLength !== undefined) {
      const plainText = state.getCurrentContent().getPlainText();
      if (plainText.length > maxLength) {
        return; 
      }
    }
    setEditorState(state);
  };

  const toggleStyle = useCallback(
    (style: string) => {
      handleChange(RichUtils.toggleInlineStyle(editorState, style));
    },
    [editorState]
  );

  const toggleColorDynamic = (colorValue: string) => {
    let formattedColor = colorValue.toUpperCase();
    if (!formattedColor.startsWith("#")) {
      formattedColor = "#" + formattedColor;
    }
    const newStyle = `COLOR_${formattedColor}`;

    if (!customStyleMap[newStyle]) {
      customStyleMap[newStyle] = { color: colorValue };
    }

    // Видалити всі старі кольори
    const colorKeys = Object.keys(customStyleMap).filter((k) =>
      k.startsWith("COLOR_")
    );

    let newState = removeInlineStyles(editorState, colorKeys);
    newState = RichUtils.toggleInlineStyle(newState, newStyle);
    handleChange(newState);
  };

  const toggleFontSize = (size: string) => {
    const style = `FONT_${size.replace("px", "")}`;
    let newState = removeInlineStyles(editorState, FONT_SIZE_STYLES);
    newState = RichUtils.toggleInlineStyle(newState, style);
    handleChange(newState);
  };

  const insertInlineSvgIcon = (svgMarkup: string) => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "SVG_ICON",
      "MUTABLE",
      {
        svg: svgMarkup,
      }
    );

    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const selection = editorState.getSelection();

    const textWithEntity = "\u200B";
    const newContentState = Modifier.insertText(
      contentState,
      selection,
      textWithEntity,
      undefined,
      entityKey
    );

    const contentWithSpace = Modifier.insertText(
      newContentState,
      newContentState.getSelectionAfter(),
      " "
    );

    const newEditorState = EditorState.push(
      editorState,
      contentWithSpace,
      "insert-characters"
    );

    setEditorState(
      EditorState.forceSelection(
        newEditorState,
        contentWithSpace.getSelectionAfter()
      )
    );
  };

  const keyBindingFn = (e: React.KeyboardEvent): string | null => {
    if (e.key === "Enter" && hasCommandModifier(e)) {
      return "insert-svg-inline";
    }
    return getDefaultKeyBinding(e);
  };

  const handleKeyCommand = (command: string, editorState: EditorState) => {
    if (command === "insert-svg-inline") {
      insertInlineSvgIcon(SVG_MARKUP);
      return "handled";
    }
    return "not-handled";
  };

  const SVG_MARKUP = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 32 32"><path fill="#699f4c" d="M16 31.75v0c8.698 0 15.75-7.052 15.75-15.75v0c0-8.698-7.052-15.75-15.75-15.75s-15.75 7.051-15.75 15.75c0 8.698 7.051 15.75 15.75 15.75zM7.082 19.552c-0.327-0.33-0.529-0.785-0.529-1.286s0.202-0.956 0.529-1.286l-0 0 0.927-0.922c0.303-0.306 0.723-0.495 1.188-0.495 0.477 0 0.908 0.2 1.213 0.521l0.001 0.001 1.638 1.699c0.153 0.161 0.368 0.261 0.607 0.261s0.454-0.1 0.606-0.261l0-0 8.347-8.605c0.306-0.322 0.737-0.522 1.214-0.522 0.471 0 0.896 0.194 1.2 0.508l0 0 0.9 0.91c0.319 0.329 0.515 0.777 0.515 1.272s-0.196 0.943-0.516 1.273l0-0-11.082 11.262c-0.304 0.315-0.731 0.51-1.203 0.51-0.464 0-0.884-0.189-1.187-0.494l-0-0z"></path></svg>`;


  return (
    <div className={styles.editorContainer}>
      <div className={styles.tools}>
        <button
          className={classNames(styles.tool, styles.bold)}
          type="button"
          onClick={() => toggleStyle("BOLD")}
        >
          B
        </button>
        <button
          className={classNames(styles.tool, styles.italic)}
          type="button"
          onClick={() => toggleStyle("ITALIC")}
        >
          I
        </button>

        <input
          type="color"
          className={classNames(styles.tool, styles.colorPicker)}
          onChange={(e) => toggleColorDynamic(e.target.value)}
          title="Обрати колір"
        />

        <select
          className={classNames(styles.tool, styles.fontSize)}
          onChange={(e) => toggleFontSize(e.target.value)}
          value={activeFontSize} 
        >
          <option value="" disabled>
            Розмір
          </option>
          {FONT_SIZES.map((size) => (
            <option key={size.value} value={size.value}>
              {size.name}
            </option>
          ))}
        </select>

        <button
          className={classNames(styles.tool, styles.iconInsert)}
          type="button"
          onClick={() => insertInlineSvgIcon(SVG_MARKUP)}
        >
          <TickIcon />
        </button>
      </div>

      <div className={styles.editorArea}>
        <Editor
          editorState={editorState}
          onChange={handleChange}
          customStyleMap={customStyleMap}
          placeholder="Введи опис..."
          keyBindingFn={keyBindingFn}
          handleKeyCommand={handleKeyCommand}
          handleBeforeInput={handleBeforeInput}
          handlePastedText={handlePastedText}
        />

        {maxLength !== undefined && (
          <div className={styles.counter}>
            {editorState.getCurrentContent().getPlainText().length} /{" "}
            {maxLength}
          </div>
        )}
      </div>
    </div>
  );
};
