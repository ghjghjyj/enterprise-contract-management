import type { Contract, Enterprise } from '@/types'

const STORAGE_KEY = 'enterprise-contract-management-demo'

const defaultEnterprises: Enterprise[] = [
  {
    id: 1,
    name: '华创科技有限公司',
    legalPerson: '张明',
    address: '上海市浦东新区世纪大道 88 号',
    industry: '互联网',
    contact: '13800001111',
    businessLicenseUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80',
    businessLicenseName: 'license-1.jpg',
    createdAt: '2024-01-12T10:00:00.000Z',
    updatedAt: '2024-03-17T18:00:00.000Z'
  },
  {
    id: 2,
    name: '蓝海建筑工程',
    legalPerson: '王强',
    address: '北京市朝阳区建国路 29 号',
    industry: '建筑业',
    contact: '13900002222',
    businessLicenseUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
    businessLicenseName: 'license-2.png',
    createdAt: '2024-01-20T09:20:00.000Z',
    updatedAt: '2024-04-18T11:15:00.000Z'
  },
  {
    id: 3,
    name: '恒阳医疗科技',
    legalPerson: '李娜',
    address: '广州开发区科技园路 3 号',
    industry: '医疗健康',
    contact: '15100003333',
    businessLicenseUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
    businessLicenseName: 'license-3.jpg',
    createdAt: '2024-02-03T13:40:00.000Z',
    updatedAt: '2024-06-01T08:30:00.000Z'
  }
]

const defaultContracts: Contract[] = [
  {
    id: 101,
    enterpriseId: 1,
    building: 'A座办公楼',
    contractNo: 'CT-202401',
    startDate: '2024-01-01',
    endDate: '2025-01-01',
    status: 'effective',
    fileName: '华创科技合同.pdf',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    fileType: 'pdf'
  },
  {
    id: 102,
    enterpriseId: 1,
    building: 'B座研发楼',
    contractNo: 'CT-202403',
    startDate: '2024-03-01',
    endDate: '2025-03-01',
    status: 'archived',
    fileName: '华创研发协议.doc',
    fileUrl: 'https://file-examples.com/storage/fe8c48d0f4ec7952a5d360d/2017/02/file-sample_100kB.doc',
    fileType: 'doc'
  },
  {
    id: 201,
    enterpriseId: 2,
    building: 'C座商务中心',
    contractNo: 'CT-202404',
    startDate: '2024-04-01',
    endDate: '2026-04-01',
    status: 'effective',
    fileName: '蓝海建筑合同.pdf',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    fileType: 'pdf'
  },
  {
    id: 301,
    enterpriseId: 3,
    building: '东区医疗大厦',
    contractNo: 'CT-202406',
    startDate: '2024-06-01',
    endDate: '2025-06-01',
    status: 'draft',
    fileName: '恒阳医疗合作.doc',
    fileUrl: 'https://file-examples.com/storage/fe8c48d0f4ec7952a5d360d/2017/02/file-sample_100kB.doc',
    fileType: 'doc'
  }
]

export const apiDelay = (timeout = 300) => new Promise<void>((resolve) => {
  setTimeout(() => resolve(), timeout)
})

export const readMockStore = () => {
  if (typeof window === 'undefined') {
    return {
      enterprises: defaultEnterprises,
      contracts: defaultContracts
    }
  }

  const raw = localStorage.getItem(STORAGE_KEY)

  if (!raw) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        enterprises: defaultEnterprises,
        contracts: defaultContracts
      })
    )
    return {
      enterprises: defaultEnterprises,
      contracts: defaultContracts
    }
  }

  try {
    return JSON.parse(raw) as {
      enterprises: Enterprise[]
      contracts: Contract[]
    }
  } catch {
    return {
      enterprises: defaultEnterprises,
      contracts: defaultContracts
    }
  }
}

export const saveStore = (store: { enterprises: Enterprise[]; contracts: Contract[] }) => {
  if (typeof window === 'undefined') {
    return
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
}

export const getEnterpriseData = () => readMockStore().enterprises
export const getContractData = () => readMockStore().contracts
