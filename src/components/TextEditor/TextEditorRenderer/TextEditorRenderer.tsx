import React, { useMemo } from "react";
import {
  convertFromRaw,
  Editor,
  EditorState,
  CompositeDecorator,
} from "draft-js";
import { customStyleMap } from "./../editorStyles";
import './TextEditorRenderer-global.scss';

const generateColorStyles = (rawContent: any) => {
  const styleMap: Record<string, React.CSSProperties> = {};

  rawContent.blocks.forEach((block: any) => {
    if (block.inlineStyleRanges) {
      block.inlineStyleRanges.forEach((range: any) => {
        const style = range.style;
        if (style.startsWith("COLOR_")) {
          if (!styleMap[style]) {
            let color = style.replace("COLOR_", "");
            if (!color.startsWith("#")) {
              color = "#" + color;
            }
            styleMap[style] = { color };
          }
        }
      });
    }
  });

  return styleMap;
};

const SvgIconBlock = (props: any) => {
  const entity = props.contentState.getEntity(props.block.getEntityAt(0));
  const { svg } = entity.getData();

  return (
    <span
      className='svg-icon'
      dangerouslySetInnerHTML={{ __html: svg }}
      style={{
        display: "inline-block",
        width: "16px",
        height: "16px",
        verticalAlign: "middle",
      }}
    />
  );
};

const blockRendererFn = (block: any) => {
  if (block.getType() === "atomic") {
    return {
      component: SvgIconBlock,
      editable: false,
    };
  }
  return null;
};

const inlineSvgDecorator = {
  strategy: (contentBlock, callback, contentState) => {
    contentBlock.findEntityRanges((character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === "SVG_ICON" 
      );
    }, callback);
  },
  component: (props: any) => {
    const { svg } = props.contentState.getEntity(props.entityKey).getData();
    return (
      <span
        className="svg-icon"
        dangerouslySetInnerHTML={{ __html: svg }}
        style={{
          display: "inline-block",
          width: "20px",
          height: "20px",
          verticalAlign: "middle",
        }}
      />
    );
  },
};

type Props = {
  value: string;
  className?: string;
  style?: React.CSSProperties;
};

export const TextEditorRenderer: React.FC<Props> = ({
  value,
  className,
  style,
}) => {
  const { editorState, combinedCustomStyleMap } = useMemo(() => {
    try {
      const rawContent = JSON.parse(value);
      const contentState = convertFromRaw(rawContent);
      const decorator = new CompositeDecorator([inlineSvgDecorator]);
      const editorState = EditorState.createWithContent(
        contentState,
        decorator
      );
      const dynamicColorStyles = generateColorStyles(rawContent);
      const combinedCustomStyleMap = {
        ...customStyleMap,
        ...dynamicColorStyles,
      };
      return { editorState, combinedCustomStyleMap };
    } catch {
      return { editorState: null, combinedCustomStyleMap: {} };
    }
  }, [value]);

  if (!editorState) {
    return <div>Невірний контент</div>;
  }

  return (
    <div className={className} style={style}>
      <Editor
        editorState={editorState}
        onChange={() => {}}
        readOnly
        customStyleMap={combinedCustomStyleMap}
        blockRendererFn={blockRendererFn}
      />
    </div>
  );
};
  
