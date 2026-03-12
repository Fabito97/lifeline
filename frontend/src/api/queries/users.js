import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userService } from "../services";
import { queryKeys } from "../queryKeys";

export const useUserProfileQuery = (id, options = {}) =>
  useQuery({
    queryKey: queryKeys.users.profile(id),
    queryFn: () => userService.getProfile(id),
    enabled: Boolean(id),
    ...options,
  });

export const useUpdateUserMutation = (options = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restOptions } = options;

  return useMutation({
    mutationFn: ({ id, data }) => userService.updateUser(id, data),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.users.profile(variables?.id),
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.me() });
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
      if (onSuccess) {
        onSuccess(data, variables, context);
      }
    },
    ...restOptions,
  });
};

export const useUserSocialMediaQuery = (id, options = {}) =>
  useQuery({
    queryKey: queryKeys.users.social(id),
    
    queryFn: () => userService.getSocialMedia(id),
    enabled: Boolean(id),
    ...options,
  });

export const useCreateUserSocialMediaMutation = (options = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restOptions } = options;

  return useMutation({
    mutationFn: ({ id, data }) => userService.createSocialMedia(id, data),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.users.social(variables?.id),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.users.profile(variables?.id),
      });
      if (onSuccess) onSuccess(data, variables, context);
    },
    ...restOptions,
  });
};

export const useDeleteUserSocialMediaMutation = (options = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restOptions } = options;

  return useMutation({
    mutationFn: ({ id, socialId }) => userService.deleteSocialMedia(id, socialId),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.users.social(variables?.id),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.users.profile(variables?.id),
      });
      if (onSuccess) onSuccess(data, variables, context);
    },
    ...restOptions,
  });
};

export const useUploadProfileImageMutation = (options = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restOptions } = options;

  return useMutation({
    mutationFn: ({ id, file }) => userService.uploadProfileImage(id, file),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.users.profile(variables?.id),
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
      if (onSuccess) onSuccess(data, variables, context);
    },
    ...restOptions,
  });
};
