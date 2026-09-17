export type Industry = '制造业' | '金融业' | '互联网' | '建筑业' | '教育培训' | '医疗健康' | '物流运输' | '零售电商'

export type ContractStatus = 'draft' | 'effective' | 'expired' | 'archived'

export interface Enterprise {
  id: number
  name: string
  legalPerson: string
  address: string
  industry: Industry
  contact: string
  businessLicenseUrl: string
  businessLicenseName: string
  createdAt: string
  updatedAt: string
  contracts?: Contract[]
}

export interface Contract {
  id: number
  enterpriseId: number
  building: string
  contractNo: string
  startDate: string
  endDate: string
  status: ContractStatus
  fileName: string
  fileUrl: string
  fileType: 'pdf' | 'doc'
}

export interface EnterpriseFormPayload {
  name: string
  legalPerson: string
  address: string
  industry: Industry
  contact: string
  businessLicenseUrl: string
  businessLicenseName: string
}

export interface ContractFormPayload {
  enterpriseId: number
  building: string
  startDate: string
  endDate: string
  fileName: string
  fileUrl: string
  fileType: 'pdf' | 'doc'
}

export interface PageResult<T> {
  list: T[]
  total: number
  currentPage: number
  pageSize: number
}
