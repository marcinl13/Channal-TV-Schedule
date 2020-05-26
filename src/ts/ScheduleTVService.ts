import axios from 'axios'
import Iresponse from '@/interfaces/Iresponse'

const API_URL = process.env.VUE_APP_API_URL

class ScheduleTVService {

  static async getFullSchedule() {
    return await this.readDataFromLocalStorage()
  }

  protected static async getDataFromAPI() {
    const res = await axios.post(API_URL, {}, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'WithCredentials': true,
        'Access-Control-Allow-Origin': '*'
      }
    })

    // if (res.status != 200 || res.data) await this.getDataFromAPI()

    return res.data as Iresponse
  }

  private static saveDataToLocalStorage(key: string, val: string) {
    localStorage.setItem(key, val)
  }

  protected static async readDataFromLocalStorage() {
    const getCreatedAt = localStorage.getItem('createdAt')
    const getData = localStorage.getItem('data') as string
    const dateNow = new Date().toLocaleDateString()

    if (getCreatedAt == null || getData == "" || dateNow !== getCreatedAt) {
      console.log('getting data from api')

      const gAPI = await this.getDataFromAPI()

      this.saveDataToLocalStorage('createdAt', gAPI.createdAt)
      this.saveDataToLocalStorage('data', JSON.stringify(gAPI.data))

      this.readDataFromLocalStorage()
    }

    const jsonFormat = JSON.parse(getData)

    console.log('read data...')
    return { createdAt: getCreatedAt, data: jsonFormat } as Iresponse

  }

  private static async getFullScheduleOld() {
    const res = await axios.post(API_URL, {}, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'WithCredentials': true,
        'Access-Control-Allow-Origin': '*'
      }
    })

    if (res.status != 200) this.getFullSchedule()

    this.readDataFromLocalStorage()
    // console.log(res)

    return res.data || {}
  }

}

export default ScheduleTVService