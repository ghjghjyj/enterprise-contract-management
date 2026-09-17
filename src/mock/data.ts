import { type Contract, type ContractFormPayload } from '@/types'
import { apiDelay, getContractData, getEnterpriseData, saveStore } from '@/mock/data'

export const getContractListByEnterpriseId = async (enterpriseId: number): Promise<Contract[]> => {
  await apiDelay(200)
  return getContractData().filter((item) => item.enterpriseId === enterpriseId)
}

export const createContract = async (payload: ContractFormPayload): Promise<Contract> => {
  await apiDelay(300)
  const store = { enterprises: getEnterpriseData(), contracts: getContractData() }
  const newContract: Contract = {
    id: Date.now(),
    enterpriseId: payload.enterpriseId,
    building: payload.building,
    contractNo: `CT-${Date.now().toString().slice(-6)}`,
    startDate: payload.startDate,
    endDate: payload.endDate,
    status: 'effective',
    fileName: payload.fileName,
    fileUrl: payload.fileUrl,
    fileType: payload.fileType
  }

  store.contracts.unshift(newContract)
  saveStore(store)
  return newContract
}

export const archiveContract = async (contractId: number): Promise<Contract> => {
  await apiDelay(250)
  const store = { enterprises: getEnterpriseData(), contracts: getContractData() }
  const index = store.contracts.findIndex((item) => item.id === contractId)

  if (index === -1) {
    throw new Error('合同不存在')
  }

  store.contracts[index] = {
    ...store.contracts[index],
    status: 'archived'
  }

  saveStore(store)
  return store.contracts[index]
}

export const deleteContract = async (contractId: number): Promise<void> => {
  await apiDelay(250)
  const store = { enterprises: getEnterpriseData(), contracts: getContractData() }
  store.contracts = store.contracts.filter((item) => item.id !== contractId)
  saveStore(store)
}
