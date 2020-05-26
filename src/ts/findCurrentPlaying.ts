import Ichannals from '@/interfaces/Ichannals'
import Ischedule from '@/interfaces/Ischedule'

/**
 * 
 * @return({
    title: string
    timeFrom: string
    timeTo: string
}) as Ischedule
 */

export default function findCurrentPlaying(data: Ichannals): Ischedule {
    const currentTime = new Date();

    const minutes = String(currentTime.getMinutes()).padStart(2, "0");
    const hours = String(currentTime.getHours());
    const now = parseInt(`${hours}${minutes}`) as number;
   

    const channalSchedule = data.schedule as Ischedule[];
    let currentPlayingObj = channalSchedule.find(sch => {
        const timeFrom = parseInt(sch.timeFrom.replace(":", "")) as number;
        const timeTo = parseInt(sch.timeTo.replace(":", "")) as number;

        if (timeFrom < now && timeTo >= now) return sch.title;
    });

    if (!currentPlayingObj) currentPlayingObj = channalSchedule[channalSchedule.length - 1] as Ischedule

    return currentPlayingObj as Ischedule;
}

