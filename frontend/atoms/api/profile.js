import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";

const fetchProfileData = async () => {
  const response = await fetch(`http://localhost/api/profile`, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export function useProfileData(initProfileData) {
  return useQuery({
    queryKey: ["profileData"],
    queryFn: fetchProfileData,
    initialData: () => {
      return initProfileData;
    },
  });
}

const updateProfileData = async ({ user }) => {
  const response = await fetch(`http://localhost/api/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken"),
    },
    body: JSON.stringify(user),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  return useMutation(updateProfileData, {
    // When mutation succeeds, invalidate queries related to profile data to get fresh data
    onSuccess: () => {
      queryClient.invalidateQueries(["profileData"]);
    },
  });
}
