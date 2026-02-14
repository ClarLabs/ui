import React, { useRef, useState } from 'react'
import styles from './styles.module.scss'

export type FileStatus = 'idle' | 'processing' | 'uploaded' | 'failed'

export interface FileItem {
	file: File
	status: FileStatus
	progress?: number
	error?: string
}

export interface FilePickerProps {
	accept?: string
	multiple?: boolean
	maxSize?: number
	disabled?: boolean
	onChange?: (files: FileItem[]) => void
	onUpload?: (file: File) => Promise<void>
	className?: string
}

export function FilePicker({ accept, multiple = false, maxSize, disabled = false, onChange, onUpload, className = '' }: FilePickerProps) {
	const [files, setFiles] = useState<FileItem[]>([])
	const inputRef = useRef<HTMLInputElement>(null)

	const handleFileSelect = async (selectedFiles: FileList | null) => {
		if (!selectedFiles || disabled) return

		const newFiles: FileItem[] = Array.from(selectedFiles).map((file) => {
			if (maxSize && file.size > maxSize) {
				return { file, status: 'failed' as FileStatus, error: 'File too large' }
			}
			return { file, status: 'idle' as FileStatus }
		})

		setFiles((prev) => (multiple ? [...prev, ...newFiles] : newFiles))
		onChange?.(newFiles)

		if (onUpload) {
			for (const fileItem of newFiles) {
				if (fileItem.status !== 'failed') {
					await processFile(fileItem)
				}
			}
		}
	}

	const processFile = async (fileItem: FileItem) => {
		updateFileStatus(fileItem.file.name, 'processing')

		try {
			await onUpload?.(fileItem.file)
			updateFileStatus(fileItem.file.name, 'uploaded')
		} catch (error) {
			updateFileStatus(fileItem.file.name, 'failed', (error as Error).message)
		}
	}

	const updateFileStatus = (fileName: string, status: FileStatus, error?: string) => {
		setFiles((prev) => prev.map((f) => (f.file.name === fileName ? { ...f, status, error } : f)))
	}

	const removeFile = (fileName: string) => {
		setFiles((prev) => prev.filter((f) => f.file.name !== fileName))
	}

	const getStatusIcon = (status: FileStatus) => {
		switch (status) {
			case 'processing':
				return '⏳'
			case 'uploaded':
				return '✓'
			case 'failed':
				return '✗'
			default:
				return '📄'
		}
	}

	return (
		<div className={`${styles.filePicker} ${className}`}>
			<div className={`${styles.dropzone} ${disabled ? styles.disabled : ''}`} onClick={() => !disabled && inputRef.current?.click()}>
				<span className={styles.icon}>📁</span>
				<span className={styles.text}>{multiple ? 'Click to select files' : 'Click to select file'}</span>
			</div>
			<input
				ref={inputRef}
				type="file"
				accept={accept}
				multiple={multiple}
				disabled={disabled}
				onChange={(e) => handleFileSelect(e.target.files)}
				className={styles.input}
			/>
			{files.length > 0 && (
				<div className={styles.fileList}>
					{files.map((fileItem, index) => (
						<div key={`${fileItem.file.name}-${index}`} className={`${styles.fileItem} ${styles[fileItem.status]}`}>
							<span className={styles.fileIcon}>{getStatusIcon(fileItem.status)}</span>
							<span className={styles.fileName}>{fileItem.file.name}</span>
							<span className={styles.fileSize}>{(fileItem.file.size / 1024).toFixed(1)} KB</span>
							{fileItem.error && <span className={styles.error}>{fileItem.error}</span>}
							<button className={styles.remove} onClick={() => removeFile(fileItem.file.name)}>
								×
							</button>
						</div>
					))}
				</div>
			)}
		</div>
	)
}
