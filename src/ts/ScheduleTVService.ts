import axios from 'axios'
import Iresponse from '@/interfaces/Iresponse'
import { getLocaleDateString, validDate } from '@/ts/getLocaleDateString'

const API_URL = process.env.VUE_APP_API_URL

class ScheduleTVService {

  static async getFullSchedule() {
    return await this.readDataFromLocalStorage()
  }

  private static async getDataFromAPI() {
    const res = await axios.post(API_URL, {}, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json',
        'WithCredentials': true,
      }
    })

    // if (res.status != 200 || res.data) await this.getDataFromAPI()

    return res.data as Iresponse
  }

  private static saveDataToLocalStorage(key: string, val: string) {
    localStorage.setItem(key, val)
  }

  protected static async readDataFromLocalStorage() {
    const dateNow = getLocaleDateString()

    let getCreatedAt = localStorage.getItem('createdAt')
    let getData = localStorage.getItem('data') as string

    if (validDate(getCreatedAt) === false || getData == "" || dateNow !== getCreatedAt) {
      console.log('getting data from api')

      const gAPI = await this.getDataFromAPI() as Iresponse

      getCreatedAt = gAPI.createdAt
      getData = JSON.stringify(gAPI.data)

      this.saveDataToLocalStorage('createdAt', gAPI.createdAt)
      this.saveDataToLocalStorage('data', JSON.stringify(gAPI.data))
    }

    console.log('read data...')

    const jsonFormat = JSON.parse(getData)
    return { createdAt: getCreatedAt, data: jsonFormat } as Iresponse

  }
}

export default ScheduleTVService