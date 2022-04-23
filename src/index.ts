import {buildStreak, formattedDate} from './utlis'
// an interface specifies what properties are expected to exist on a value
import { Streak } from './utlis'
import { KEY } from './utlis'
import { updateStreak } from './utlis'

function shouldIncrementOrResetStreakCount(currentDate: Date, lastLoginDate: string) : 'increment' | 'reset' | 'none'{
     // We get 11/5/2021
    // so to get 5, we split on / and get the second item
    const difference = currentDate.getDate() - parseInt(lastLoginDate.split('/')[1])

    if(difference===0){
        return 'none'
    }
    
    if(difference ===1){ //if they logged in on a consecutive day
        return 'increment'
    }
    return 'reset'
}

export function streakCounter(storage: Storage, date: Date) : Streak {
    const streakInLocalStorage = storage.getItem(KEY) //in the function call, localstorage is passed as storage through the param

    if(streakInLocalStorage){
        try {
            const streak = JSON.parse(streakInLocalStorage) as Streak
            const state = shouldIncrementOrResetStreakCount(date, streak.lastLoginDate)
            const SHOULD_INCREMENT = state === "increment"
            const SHOULD_RESET = state === "reset"
            if(SHOULD_INCREMENT){
                const updatedStreak = buildStreak(date, {
                    startDate : streak.startDate,
                    currentCount : streak.currentCount+1,
                    lastLoginDate : formattedDate(date)
                })
                //save updated streak count to localStorage
                updateStreak(storage,updatedStreak)
            return updatedStreak
            }
            if(SHOULD_RESET){ 
                const updatedStreak = buildStreak(date)
            //store in localStorage
                updateStreak(storage,updatedStreak)
                return updatedStreak
            }
            
            return streak
        }
        catch (error) {
            console.error('failed to parse streak from localStorage')
        }
    }

    const streak = buildStreak(date)
    //store in localStorage
    updateStreak(storage, streak) //how did storage.setitem become available by default ?
    return streak
}