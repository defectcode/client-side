import { useRef, useMemo, ChangeEvent } from 'react'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { fileService } from '@/services/file.service'

export function useVideoUpload(onChange: (value: string) => void) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { mutate: uploadVideo, isPending: isUploading } = useMutation({
    mutationKey: ['upload video'],
    mutationFn: (formData: FormData) => fileService.upload(formData),
    onSuccess(data) {
      onChange(data[0].url)
    },
    onError() {
      toast.error('Error uploading video')
    },
  })

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append('files', file)

    uploadVideo(formData)
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  return useMemo(
    () => ({
      handleButtonClick,
      fileInputRef,
      handleFileChange,
      isUploading,
    }),
    [fileInputRef, handleFileChange, isUploading]
  )
}
