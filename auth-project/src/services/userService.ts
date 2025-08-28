import axiosInstance from "@/lib/axios";

const userAPI = "api/users";

export async function uploadAvatar(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  await axiosInstance.put(`${userAPI}/me/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
