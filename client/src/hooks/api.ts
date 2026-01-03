import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import type {
  GetImageByIdResponse,
  GetImagesResponse,
  TransformPayload,
  TransformResponse,
} from "../lib/types";

const baseUrl = "http://localhost:8080/api/v1";

export function useLogin() {
  return useMutation({
    mutationFn: async (payload: { email: string; password: string }) => {
      const response = await axios.post(`${baseUrl}/auth/login`, payload, {
        withCredentials: true,
      });
      return response.data;
    },
    onSuccess: () => {
      console.log("sucess");
    },
    onError: (error) => {
      console.log(error);
    },
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: async (payload: {
      name: string;
      email: string;
      password: string;
      confirmPassword: string;
    }) => {
      const response = await axios.post(`${baseUrl}/auth/register`, payload);

      return response.data;
    },

    onSuccess: () => {
      console.log("success");
    },
    onError: (error) => {
      console.log(error);
    },
  });
}

export function useGetImages() {
  return useQuery({
    queryKey: ["images"],
    queryFn: async () => {
      const res = await axios.get<GetImagesResponse>(`${baseUrl}/images`, {
        withCredentials: true,
      });

      return res.data.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useUploadImages() {
  return useMutation({
    mutationFn: async (payload: { image: File }) => {
      const response = await axios.post(`${baseUrl}/upload`, payload, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
    onSuccess: () => {
      console.log("success");
    },
    onError: (error) => {
      console.log(error);
    },
  });
}

export function useTransformImage(imageId: string) {
  return useMutation<TransformResponse, Error, TransformPayload>({
    mutationFn: async (payload) => {
      const { data } = await axios.post<TransformResponse>(
        `${baseUrl}/images/${imageId}/transform`,
        payload,
        { withCredentials: true }
      );
      return data;
    },
  });
}

export function useGetImageById(imageId: string) {
  return useQuery({
    queryKey: ["image", imageId],
    queryFn: async () => {
      const res = await axios.get<GetImageByIdResponse>(
        `${baseUrl}/images/${imageId}`,
        { withCredentials: true }
      );
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}
