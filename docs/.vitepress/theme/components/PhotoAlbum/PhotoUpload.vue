<template>
  <div class="photo-upload">
    <!-- 上传区域 -->
    <div
      ref="uploadArea"
      class="upload-area"
      :class="{
        'is-dragover': isDragover,
        'is-uploading': isUploading
      }"
      @click="triggerFileInput"
      @dragover.prevent="handleDragover"
      @dragleave.prevent="handleDragleave"
      @drop.prevent="handleDrop"
    >
      <div class="upload-content">
        <div v-if="!isUploading" class="upload-placeholder">
          <div class="upload-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
              <path
                d="M14.2639 15.9375L12 13.6736L9.73611 15.9375L9 15.2014L12 12.2014L15 15.2014L14.2639 15.9375Z"
                fill="currentColor"
              />
              <path
                d="M12 2L12 13"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
              <path
                d="M3 15C3 17.8284 3 19.2426 3.87868 20.1213C4.75736 21 6.17157 21 9 21H15C17.8284 21 19.2426 21 20.1213 20.1213C21 19.2426 21 17.8284 21 15"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </div>
          <div class="upload-text">
            <p class="primary-text">点击或拖拽文件到此处上传</p>
            <p class="secondary-text"
              >支持 JPG、PNG、GIF、WebP 格式，最大 10MB</p
            >
          </div>
        </div>

        <!-- 上传进度 -->
        <div v-else class="upload-progress">
          <div class="progress-icon">
            <div class="spinner"></div>
          </div>
          <div class="progress-text">
            <p>正在上传...</p>
            <div class="progress-bar">
              <div
                class="progress-fill"
                :style="{ width: uploadProgress + '%' }"
              ></div>
            </div>
            <p class="progress-percentage">{{ uploadProgress }}%</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 文件输入 -->
    <input
      ref="fileInput"
      type="file"
      accept="image/*"
      multiple
      style="display: none"
      @change="handleFileSelect"
    />

    <!-- 预览队列 -->
    <div v-if="previewFiles.length > 0" class="preview-queue">
      <h4>待上传文件 ({{ previewFiles.length }})</h4>
      <div class="preview-list">
        <div
          v-for="(file, index) in previewFiles"
          :key="index"
          class="preview-item"
        >
          <div class="preview-image">
            <img :src="file.preview" :alt="file.name" />
          </div>
          <div class="preview-info">
            <p class="file-name">{{ file.name }}</p>
            <p class="file-size">{{ formatFileSize(file.size) }}</p>
            <div class="preview-actions">
              <button
                class="btn-edit"
                @click="editFileMetadata(index)"
                title="编辑信息"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M14.3601 4.07866L15.2869 3.15178C16.8226 1.61607 19.3125 1.61607 20.8482 3.15178C22.3839 4.68748 22.3839 7.17735 20.8482 8.71306L19.9213 9.63993M14.3601 4.07866C14.3601 4.07866 14.4759 6.04828 16.2138 7.78618C17.9517 9.52407 19.9213 9.63993 19.9213 9.63993M14.3601 4.07866L12 6.43882L19.9213 9.63993M9.04145 9.3976L4.12142 14.3176C3.14142 15.2976 2.65142 15.7876 2.31942 16.3946C1.98742 17.0016 1.82742 17.6906 1.50742 19.0686L1.18742 20.4466C1.09742 20.8896 1.26742 21.3406 1.61742 21.6906C1.96742 22.0406 2.41842 22.2106 2.86142 22.1206L4.23942 21.8006C5.61742 21.4806 6.30642 21.3206 6.91342 20.9886C7.52042 20.6566 8.01042 20.1666 8.99042 19.1866L13.9104 14.2666M9.04145 9.3976L13.9104 14.2666M9.04145 9.3976L11.4004 6.43882L13.9104 14.2666"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
              <button
                class="btn-remove"
                @click="removePreviewFile(index)"
                title="移除"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M18 6L6 18M6 6L18 18"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 批量操作 -->
      <div class="batch-actions">
        <button
          class="btn-primary"
          @click="uploadAllFiles"
          :disabled="isUploading"
        >
          上传所有文件
        </button>
        <button
          class="btn-secondary"
          @click="clearPreview"
          :disabled="isUploading"
        >
          清空列表
        </button>
      </div>
    </div>

    <!-- 元数据编辑弹窗 -->
    <div v-if="editingFile" class="modal-overlay" @click="closeEditModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>编辑文件信息</h3>
          <button class="modal-close" @click="closeEditModal">×</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label>标题</label>
            <input
              v-model="editingFile.title"
              type="text"
              placeholder="输入图片标题..."
            />
          </div>
          <div class="form-group">
            <label>描述</label>
            <textarea
              v-model="editingFile.description"
              placeholder="输入图片描述..."
              rows="3"
            ></textarea>
          </div>
          <div class="form-group">
            <label>标签</label>
            <input
              v-model="tagInput"
              type="text"
              placeholder="输入标签，用逗号分隔"
              @blur="updateTags"
            />
            <div
              v-if="editingFile.tags && editingFile.tags.length > 0"
              class="tag-list"
            >
              <span v-for="tag in editingFile.tags" :key="tag" class="tag">
                {{ tag }}
                <button @click="removeTag(tag)">×</button>
              </span>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-primary" @click="saveFileMetadata">保存</button>
          <button class="btn-secondary" @click="closeEditModal">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { photoService } from './photoService'
import type { UploadResult } from './types'

// 定义事件
const emit = defineEmits<{
  uploadSuccess: [result: UploadResult]
  uploadError: [error: string]
  uploadProgress: [progress: number]
}>()

// 响应式数据
const uploadArea = ref<HTMLElement>()
const fileInput = ref<HTMLInputElement>()
const isDragover = ref(false)
const isUploading = ref(false)
const uploadProgress = ref(0)

// 预览文件列表
interface PreviewFile extends File {
  preview: string
  title?: string
  description?: string
  tags?: string[]
}

const previewFiles = ref<PreviewFile[]>([])

// 编辑文件信息
const editingFile = ref<PreviewFile | null>(null)
const editingIndex = ref(-1)
const tagInput = ref('')

// 处理拖拽
const handleDragover = (e: DragEvent) => {
  e.preventDefault()
  isDragover.value = true
}

const handleDragleave = (e: DragEvent) => {
  e.preventDefault()
  // 检查是否真的离开了上传区域
  if (!uploadArea.value?.contains(e.relatedTarget as Node)) {
    isDragover.value = false
  }
}

const handleDrop = (e: DragEvent) => {
  e.preventDefault()
  isDragover.value = false

  const files = e.dataTransfer?.files
  if (files) {
    handleFiles(Array.from(files))
  }
}

// 触发文件选择
const triggerFileInput = () => {
  if (!isUploading.value) {
    fileInput.value?.click()
  }
}

// 处理文件选择
const handleFileSelect = (e: Event) => {
  const target = e.target as HTMLInputElement
  const files = target.files
  if (files) {
    handleFiles(Array.from(files))
  }
  // 清空input值，允许选择相同文件
  target.value = ''
}

// 处理文件
const handleFiles = async (files: File[]) => {
  const validFiles: PreviewFile[] = []

  for (const file of files) {
    const validation = photoService.validateFile(file)
    if (validation.valid) {
      const previewFile = file as PreviewFile
      previewFile.preview = URL.createObjectURL(file)
      previewFile.title = file.name.replace(/\.[^/.]+$/, '') // 去掉扩展名
      previewFile.description = ''
      previewFile.tags = []
      validFiles.push(previewFile)
    } else {
      emit('uploadError', validation.error || '文件验证失败')
    }
  }

  previewFiles.value.push(...validFiles)
}

// 移除预览文件
const removePreviewFile = (index: number) => {
  const file = previewFiles.value[index]
  URL.revokeObjectURL(file.preview)
  previewFiles.value.splice(index, 1)
}

// 清空预览
const clearPreview = () => {
  previewFiles.value.forEach((file) => URL.revokeObjectURL(file.preview))
  previewFiles.value = []
}

// 编辑文件元数据
const editFileMetadata = (index: number) => {
  editingFile.value = { ...previewFiles.value[index] } as PreviewFile
  editingIndex.value = index
  tagInput.value = editingFile.value.tags?.join(', ') || ''
}

// 关闭编辑弹窗
const closeEditModal = () => {
  editingFile.value = null
  editingIndex.value = -1
  tagInput.value = ''
}

// 更新标签
const updateTags = () => {
  if (editingFile.value) {
    editingFile.value.tags = tagInput.value
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0)
  }
}

// 移除标签
const removeTag = (tagToRemove: string) => {
  if (editingFile.value && editingFile.value.tags) {
    editingFile.value.tags = editingFile.value.tags.filter(
      (tag) => tag !== tagToRemove
    )
    tagInput.value = editingFile.value.tags.join(', ')
  }
}

// 保存文件元数据
const saveFileMetadata = () => {
  if (editingFile.value && editingIndex.value >= 0) {
    previewFiles.value[editingIndex.value] = editingFile.value
    closeEditModal()
  }
}

// 上传单个文件
const uploadFile = async (file: PreviewFile): Promise<UploadResult> => {
  const metadata = {
    title: file.title,
    description: file.description,
    tags: file.tags
  }

  return await photoService.uploadPhoto(file, metadata, (progress) => {
    uploadProgress.value = progress.percentage
    emit('uploadProgress', progress.percentage)
  })
}

// 上传所有文件
const uploadAllFiles = async () => {
  if (previewFiles.value.length === 0 || isUploading.value) return

  isUploading.value = true
  uploadProgress.value = 0

  try {
    for (let i = 0; i < previewFiles.value.length; i++) {
      const file = previewFiles.value[i]
      const result = await uploadFile(file)

      if (result.success) {
        emit('uploadSuccess', result)
        // 从预览列表中移除已上传的文件
        removePreviewFile(i)
        i-- // 调整索引
      } else {
        emit('uploadError', result.error || '上传失败')
      }
    }
  } catch (error) {
    emit(
      'uploadError',
      error instanceof Error ? error.message : '上传过程中发生错误'
    )
  } finally {
    isUploading.value = false
    uploadProgress.value = 0
  }
}

// 格式化文件大小
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// 清理资源
onUnmounted(() => {
  previewFiles.value.forEach((file) => URL.revokeObjectURL(file.preview))
})
</script>

<style scoped>
.photo-upload {
  max-width: 100%;
}

.upload-area {
  border: 2px dashed #d1d5db;
  border-radius: 12px;
  padding: 3rem 2rem;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
  background: #fafafa;
}

.upload-area:hover {
  border-color: #3b82f6;
  background: #f8fafc;
}

.upload-area.is-dragover {
  border-color: #3b82f6;
  background: #eff6ff;
  transform: scale(1.02);
}

.upload-area.is-uploading {
  cursor: not-allowed;
  opacity: 0.7;
}

.upload-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.upload-icon {
  color: #6b7280;
  transition: color 0.3s ease;
}

.upload-area:hover .upload-icon {
  color: #3b82f6;
}

.upload-text .primary-text {
  font-size: 1.125rem;
  font-weight: 600;
  color: #374151;
  margin: 0;
}

.upload-text .secondary-text {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0.5rem 0 0 0;
}

.upload-progress {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.progress-icon .spinner {
  width: 24px;
  height: 24px;
  border: 2px solid #e5e7eb;
  border-top: 2px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.progress-text {
  flex: 1;
  text-align: left;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
  margin: 0.5rem 0;
}

.progress-fill {
  height: 100%;
  background: #3b82f6;
  transition: width 0.3s ease;
}

.progress-percentage {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
}

.preview-queue {
  margin-top: 2rem;
  padding: 1.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #fff;
}

.preview-queue h4 {
  margin: 0 0 1rem 0;
  color: #374151;
  font-size: 1.125rem;
}

.preview-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.preview-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #f9fafb;
}

.preview-image {
  flex-shrink: 0;
  width: 60px;
  height: 60px;
  border-radius: 6px;
  overflow: hidden;
  background: #e5e7eb;
}

.preview-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.preview-info {
  flex: 1;
  min-width: 0;
}

.file-name {
  font-weight: 500;
  color: #374151;
  margin: 0 0 0.25rem 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.file-size {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
}

.preview-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-edit,
.btn-remove {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-edit {
  background: #3b82f6;
  color: white;
}

.btn-edit:hover {
  background: #2563eb;
}

.btn-remove {
  background: #ef4444;
  color: white;
}

.btn-remove:hover {
  background: #dc2626;
}

.batch-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.btn-primary,
.btn-secondary {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary {
  background: #3b82f6;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #2563eb;
}

.btn-primary:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

.btn-secondary {
  background: #f3f4f6;
  color: #374151;
  border: 1px solid #d1d5db;
}

.btn-secondary:hover:not(:disabled) {
  background: #e5e7eb;
}

/* 模态框样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 12px;
  padding: 0;
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow: hidden;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.modal-header h3 {
  margin: 0;
  color: #374151;
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6b7280;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-close:hover {
  color: #374151;
}

.modal-body {
  padding: 1.5rem;
  max-height: 400px;
  overflow-y: auto;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group:last-child {
  margin-bottom: 0;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #374151;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.875rem;
  transition: border-color 0.2s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.tag {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  background: #eff6ff;
  color: #1d4ed8;
  border-radius: 4px;
  font-size: 0.75rem;
}

.tag button {
  background: none;
  border: none;
  color: #1d4ed8;
  cursor: pointer;
  padding: 0;
  font-size: 0.875rem;
}

.modal-footer {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  padding: 1.5rem;
  border-top: 1px solid #e5e7eb;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .upload-area {
    padding: 2rem 1rem;
  }

  .preview-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .preview-actions {
    align-self: flex-end;
  }

  .batch-actions {
    flex-direction: column;
  }

  .modal-content {
    width: 95%;
    margin: 1rem;
  }
}
</style>
