import { Video } from 'lucide-react'
import { cn } from '@/utils/clsx'
import { Button } from '../../Button'
import { useVideoUpload } from './useVideoUpload'
import styles from '../image-upload/ImageUpload.module.scss'


interface VideoUploadProps {
  isDisabled: boolean
  onChange: (value: string) => void
  value: string
}

export function VideoUpload({ isDisabled, onChange, value }: VideoUploadProps) {
  const { handleButtonClick, fileInputRef, handleFileChange, isUploading } = useVideoUpload(onChange)

  return (
    <div className={styles.image_container}>
      {value && (
        <video controls className="rounded-lg border border-gray-700">
          <source src={value} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      <Button
        type="button"
        disabled={isDisabled || isUploading}
        variant="secondary"
        onClick={handleButtonClick}
        className={cn(styles.upload, { 'mt-4': !!value })}
      >
        <Video className="mr-2 h-4 w-4" />
        Upload video
      </Button>
      <input
        type="file"
        accept="video/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
        disabled={isDisabled}
      />
    </div>
  )
}
