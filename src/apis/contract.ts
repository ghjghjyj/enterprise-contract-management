import request from './request'
import { type Enterprise, type EnterpriseFormPayload, type PageResult } from '@/types'
import { apiDelay, getEnterpriseData, getContractData, saveStore } from '@/mock/data'

export const getEnterprisePage = async (params: {
  keyword?: string
  page: number
  pageSize: number
}): Promise<PageResult<Enterprise>> => {
  await apiDelay(250)
  const keyword = (params.keyword || '').trim().toLowerCase()
  const data = getEnterpriseData()
  const filtered = keyword
    ? data.filter((item) => item.name.toLowerCase().includes(keyword))
    : data

  const list = filtered
    .slice((params.page - 1) * params.pageSize, params.page * params.pageSize)
    .map((item) => ({
      ...item,
      contracts: getContractData().filter((contract) => contract.enterpriseId === item.id)
    }))

  return {
    list,
    total: filtered.length,
    currentPage: params.page,
    pageSize: params.pageSize
  }
}

export const getEnterpriseById = async (id: number): Promise<Enterprise> => {
  await apiDelay(200)
  const current = getEnterpriseData().find((item) => item.id === id)

  if (!current) {
    throw new Error('企业不存在')
  }

  return current
}

export const createEnterprise = async (payload: EnterpriseFormPayload): Promise<Enterprise> => {
  await apiDelay(300)
  const store = { enterprises: getEnterpriseData(), contracts: getContractData() }
  const newEnterprise: Enterprise = {
    id: Date.now(),
    name: payload.name,
    legalPerson: payload.legalPerson,
    address: payload.address,
    industry: payload.industry,
    contact: payload.contact,
    businessLicenseUrl: payload.businessLicenseUrl,
    businessLicenseName: payload.businessLicenseName,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }

  store.enterprises.unshift(newEnterprise)
  saveStore(store)
  return newEnterprise
}

export const updateEnterprise = async (id: number, payload: EnterpriseFormPayload): Promise<Enterprise> => {
  await apiDelay(300)
  const store = { enterprises: getEnterpriseData(), contracts: getContractData() }
  const index = store.enterprises.findIndex((item) => item.id === id)

  if (index === -1) {
    throw new Error('未找到企业信息')
  }

  store.enterprises[index] = {
    ...store.enterprises[index],
    ...payload,
    updatedAt: new Date().toISOString()
  }

  saveStore(store)
  return store.enterprises[index]
}

export const deleteEnterprise = async (id: number): Promise<void> => {
  await apiDelay(250)
  const store = { enterprises: getEnterpriseData(), contracts: getContractData() }
  store.enterprises = store.enterprises.filter((item) => item.id !== id)
  store.contracts = store.contracts.filter((contract) => contract.enterpriseId !== id)
  saveStore(store)
}

export const requestEnterpriseDemo = async () => {
  await request.get('/enterprise')
}
