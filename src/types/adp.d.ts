export interface IAdpToken {
  value: string
  expirationTime: number
}

export interface IAdpWorker {
  associateID: string
  workerID: string
  email: string
  preferredFirstName?: string
  preferredLastName?: string
  legalFirstName: string
  legalMiddleName: string
  legalLastName: string
  birthDate: string
  hireDate: string
  photoUrl: string
  photoData?: Buffer
}
