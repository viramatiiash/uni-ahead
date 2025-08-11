import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import styles from "./BannerAP.module.scss";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Input from "@/components/Input/Input";
import { TextEditor } from "@/components/TextEditor/TextEditor";
import { Button } from "@/components/Button/Button";
import { toast } from "react-toastify";
import { AdminPanelSectionTitle } from "@/components/AdminPanelSectionTitle/AdminPanelSectionTitle";
import { UploadImage } from "../UploadImage/UploadImage";
import { useIconRemover } from "../../hooks/useIconRemover";
import { SortableList } from "@/components/dnd/SortableList";
import { DragIcon } from "@assets/icons";
import { Divider } from "@/components/Divider/Divider";
import { API_BASE_URL } from "@/constants/api";

const CLOUDINARY_API_URL = `https://api.cloudinary.com/v1_1/dfxxhionq/upload`;

type Photo = {
  url: string;
  publicId: string;
  order: number;
};

type BannerType = {
  _id: string;
  title: string;
  text: string;
  photos: Photo[];
};

const fetchBanner = async (): Promise<BannerType> => {
  const res = await fetch(`${API_BASE_URL}/api/banner`);
  return res.json();
};

const updateBanner = async (data: BannerType) => {
  const res = await fetch(`${API_BASE_URL}/api/banner/${data._id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const BannerAP = () => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["banner"],
    queryFn: fetchBanner,
  });

  // Використаємо useForm для загальних полів (title, text)
  const { control, handleSubmit, reset, setValue, getValues } =
    useForm<BannerType>({
      defaultValues: {
        title: "",
        text: "",
        photos: [],
        _id: "",
      },
    });

  const [photos, setPhotos] = useState<Photo[]>([]);

  const { handleIconRemove, deleteIconsFromCloudinary } = useIconRemover({
    getValues: () => ({
      paymentPlans: [],
      courseIcon: "",
      bannerPhotos: photos,
    }),
    setValue: (field: string, value: any) => {
      if (field === "bannerPhotos") setPhotos(value);
    },
  });

  useEffect(() => {
    if (data) {
      reset(data);
      setPhotos(data.photos || []);
    }
  }, [data, reset]);

  const handleReorder = (newPhotos: Photo[]) => {
    const ordered = newPhotos.map((p, i) => ({ ...p, order: i + 1 }));
    setPhotos(ordered);
  };

  const onRemovePhoto = (publicId: string) => {
    if (!publicId) return;
    handleIconRemove(-1, -1);
    const filtered = photos.filter((p) => p.publicId !== publicId);
    setPhotos(filtered);
  };

  const onChangePhoto = async (file: File, index: number | null = null) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "uni-ahead");
    formData.append("folder", "banner-bgs");

    try {
      const res = await fetch(CLOUDINARY_API_URL, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(
          `Upload failed: ${res.status} ${res.statusText} - ${errorText}`
        );
      }

      const data = await res.json();

      if (!data.secure_url || !data.public_id) {
        console.error("Cloudinary response is missing expected fields:", data);
        throw new Error("Некоректна відповідь від Cloudinary");
      }

      const newPhoto = {
        url: data.secure_url,
        publicId: data.public_id,
        order: index === null ? photos.length + 1 : photos[index].order,
      };

      if (index === null) {
        // Додаємо нове фото
        setPhotos((prev) => [...prev, newPhoto]);
      } else {
        // Замінюємо існуюче фото
        const updated = [...photos];
        updated[index] = newPhoto;
        setPhotos(updated);
      }
    } catch (error: any) {
      console.error("Помилка завантаження фото:", error);
      toast.error("Помилка завантаження зображення. Перевірте консоль.");
    }
  };

  const mutation = useMutation({
    mutationFn: updateBanner,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banner"] });
      toast.success("Зміни збережено");
    },
    onError: () => {
      toast.error("Не вдалося зберегти зміни");
    },
  });

  const onSubmit: SubmitHandler<BannerType> = async (formData) => {
    try {
      // Відправляємо форму з новим масивом фото
      await mutation.mutateAsync({
        ...formData,
        photos,
      });
      // Після успішного оновлення — видаляємо позначені фото з Cloudinary
      await deleteIconsFromCloudinary();
    } catch (e) {
      console.error(e);
    }
  };

  if (isLoading || !data) return <div>Завантаження...</div>;

  return (
    <>
      <div className="adminPanelMargin">
        <AdminPanelSectionTitle title="Баннер" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.bannerInputs}>
          <Input
            belongsTo="banner"
            name="title"
            control={control}
            variant="adminPanel"
            label="Головний заголовок"
            showCounter
            rules={{
              maxLength: { value: 50, message: "Максимум 50 символів" },
              required: "Це поле обов’язкове",
            }}
          />

          <Controller
            name="text"
            control={control}
            render={({ field }) => (
              <div>
                <p className={styles.label}>Текст</p>
                <TextEditor
                  maxLength={200}
                  value={field.value}
                  onChange={field.onChange}
                />
              </div>
            )}
          />
        </div>

        <div className={styles.photosSection}>
          <p className={styles.label}>Фото банера</p>

          <SortableList
            items={photos.sort((a, b) => a.order - b.order)}
            getId={(item) => item.publicId}
            onChange={handleReorder}
            renderItem={(photo, { attributes, listeners }) => {
              const index = photos.findIndex(
                (p) => p.publicId === photo.publicId
              );

              return (
                <>
                  <div key={photo.publicId} className={styles.photoContainer}>
                    <UploadImage
                      banner
                      image={photo.url}
                      onRemove={() => onRemovePhoto(photo.publicId)}
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          onChangePhoto(e.target.files[0], index);
                        }
                      }}
                      label={`Фото #${photo.order}`}
                    />
                    <span
                      className={styles.dragIconContainer}
                      {...attributes}
                      {...listeners}
                    >
                      <DragIcon className={styles.dragIcon} />
                    </span>
                  </div>
                  <Divider />
                </>
              );
            }}
          />

          <div className={styles.newPhoto}>
            <UploadImage
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  onChangePhoto(e.target.files[0], null);
                }
              }}
              label="Додати нове фото"
            />
          </div>
        </div>

        <Button className={styles.button} type="submit" variant="success">
          Зберегти
        </Button>
      </form>
    </>
  );
};
