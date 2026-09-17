<template>
  <div class="form-page">
    <el-card class="form-card" shadow="never">
      <div class="form-header">
        <h2>{{ modeLabel }}</h2>
        <el-button @click="router.back()">返回</el-button>
      </div>

      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="120px"
        label-position="right"
        size="default"
      >
        <div class="form-grid">
          <el-form-item label="企业名称" prop="name" class="full-width">
            <el-input v-model="form.name" placeholder="请输入企业名称" clearable />
          </el-form-item>

          <el-form-item label="法人" prop="legalPerson">
            <el-input v-model="form.legalPerson" placeholder="请输入法人名称" clearable />
          </el-form-item>

          <el-form-item label="联系方式" prop="contact">
            <el-input v-model="form.contact" placeholder="请输入联系方式" clearable />
          </el-form-item>

          <el-form-item label="注册地址" prop="address" class="full-width">
            <el-input v-model="form.address" type="textarea" :rows="2" placeholder="请输入注册地址" />
          </el-form-item>

          <el-form-item label="行业" prop="industry">
            <el-select v-model="form.industry" placeholder="请选择行业" style="width: 100%">
              <el-option v-for="item in industries" :key="item" :label="item" :value="item" />
            </el-select>
          </el-form-item>

          <el-form-item label="营业执照" prop="businessLicenseUrl">
            <div class="upload-box" v-if="imageUrl">
              <img :src="imageUrl" alt="营业执照预览" />
            </div>
            <el-upload
              v-else
              :auto-upload="false"
              :show-file-list="false"
              :before-upload="beforeImageUpload"
              @change="handleImageChange"
            >
              <el-button type="primary" plain>上传图片</el-button>
            </el-upload>

            <div v-if="imageUrl" style="margin-left: 12px">
              <el-upload
                :auto-upload="false"
                :show-file-list="false"
                :before-upload="beforeImageUpload"
                @change="handleImageChange"
              >
                <el-button type="primary" plain>重新上传</el-button>
              </el-upload>
            </div>
          </el-form-item>
        </div>

        <div class="action-bar">
          <el-button @click="router.back()">取消</el-button>
          <el-button type="primary" :loading="loading" @click="submitForm">
            {{ mode === 'edit' ? '保存修改' : '新增企业' }}
          </el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { createEnterprise, getEnterpriseById, updateEnterprise } from '@/apis/enterprise'
import type { EnterpriseFormPayload, Industry } from '@/types'

const route = useRoute()
const router = useRouter()
const formRef = ref()
const loading = ref(false)
const imageUrl = ref('')
const industries: Industry[] = [
  '制造业',
  '金融业',
  '互联网',
  '建筑业',
  '教育培训',
  '医疗健康',
  '物流运输',
  '零售电商'
]

const mode = computed(() => (route.query.mode === 'edit' ? 'edit' : 'add'))
const modeLabel = computed(() => (mode.value === 'edit' ? '编辑企业' : '新增企业'))

const form = reactive<EnterpriseFormPayload>({
  name: '',
  legalPerson: '',
  address: '',
  industry: '互联网',
  contact: '',
  businessLicenseUrl: '',
  businessLicenseName: ''
})

const rules = {
  name: [{ required: true, message: '请输入企业名称', trigger: 'blur' }],
  legalPerson: [{ required: true, message: '请输入法人名称', trigger: 'blur' }],
  address: [{ required: true, message: '请输入注册地址', trigger: 'blur' }],
  industry: [{ required: true, message: '请选择行业', trigger: 'change' }],
  contact: [
    { required: true, message: '请输入联系方式', trigger: 'blur' },
    {
      validator: (_rule: unknown, value: string, callback: (error?: Error) => void) => {
        if (!/^1[3-9]\d{9}$/.test(value)) {
          callback(new Error('请输入正确的手机号'))
          return
        }
        callback()
      },
      trigger: 'blur'
    }
  ],
  businessLicenseUrl: [
    {
      validator: (_rule: unknown, _value: string, callback: (error?: Error) => void) => {
        if (!form.businessLicenseUrl) {
          callback(new Error('请上传营业执照图片'))
          return
        }
        callback()
      },
      trigger: 'change'
    }
  ]
}

const beforeImageUpload = (file: File) => {
  const validTypes = ['image/jpeg', 'image/png']
  if (!validTypes.includes(file.type)) {
    ElMessage.error('营业执照仅支持 JPG/PNG 格式')
    return false
  }
  if (file.size > 5 * 1024 * 1024) {
    ElMessage.error('营业执照大小不能超过 5MB')
    return false
  }
  return true
}

const handleImageChange = async (file: { raw: File }) => {
  const rawFile = file.raw
  if (!rawFile) return

  const objectUrl = URL.createObjectURL(rawFile)
  form.businessLicenseUrl = objectUrl
  form.businessLicenseName = rawFile.name
  imageUrl.value = objectUrl

  await formRef.value?.validateField('businessLicenseUrl')
}

const submitForm = async () => {
  if (!formRef.value) return

  await formRef.value.validate()
  loading.value = true

  try {
    if (mode.value === 'edit') {
      const id = Number(route.query.id)
      await updateEnterprise(id, form)
      ElMessage.success('企业修改成功')
    } else {
      await createEnterprise(form)
      ElMessage.success('企业新增成功')
    }
    router.push({ name: 'enterprise' })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : '保存失败'
    ElMessage.error(message)
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  if (mode.value !== 'edit') return

  const id = Number(route.query.id)
  if (!id) {
    return
  }

  try {
    const enterprise = await getEnterpriseById(id)
    form.name = enterprise.name
    form.legalPerson = enterprise.legalPerson
    form.address = enterprise.address
    form.industry = enterprise.industry
    form.contact = enterprise.contact
    form.businessLicenseUrl = enterprise.businessLicenseUrl
    form.businessLicenseName = enterprise.businessLicenseName
    imageUrl.value = enterprise.businessLicenseUrl
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : '加载企业信息失败'
    ElMessage.error(message)
  }
})
</script>
