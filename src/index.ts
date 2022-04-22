import {formattedDate} from './utlis'
// an interface specifies what properties are expected to exist on a value
interface Streak {
    currentCount : number
    startDate : string
    lastLoginDate : string
}

const KEY = 'streak'

function shouldIncrementOrResetStreakCount(currentDate: Date, lastLoginDate: string) : 'increment' | 'reset' {
     // We get 11/5/2021
    // so to get 5, we split on / and get the second item
    const difference = currentDate.getDate() - parseInt(lastLoginDate.split('/')[1])
    
    if(difference ===1){ //if they logged in on a consecutive day
        return 'increment'
    }
    return 'reset'
}

export function streakCounter(storage: Storage, date: Date) : Streak {
    const streakInLocalStorage = storage.getItem(KEY) //in the function call, localstorage is passed as storage through the param

    if(streakInLocalStorage){
        try {
            const streak = JSON.parse(streakInLocalStorage)
            const state = shouldIncrementOrResetStreakCount(date, streak.lastLoginDate)
            const SHOULD_INCREMENT = state === "increment"
            const SHOULD_RESET = state === "reset"
            if(SHOULD_INCREMENT){
                const updated_streak: Streak = {
                    ...streak,
                    currentCount : streak.currentCount + 1,
                    lastLoginDate : formattedDate(date),
                }
                //save updated streak count to localStorage
                storage.setItem(KEY,JSON.stringify(updated_streak))
            return updated_streak
            }
            if(SHOULD_RESET){
                const updatedStreak: Streak = {
                    currentCount : 1,
                    startDate: formattedDate(date),
                    lastLoginDate: formattedDate(date),
                }
            //store in localStorage
            storage.setItem(KEY, JSON.stringify(updatedStreak))
            return updatedStreak
            }
            
            return streak
        }
        catch (error) {
            console.error('failed to parse streak from localStorage')
        }
    }

    const streak =  {
        currentCount : 1,
        startDate : formattedDate(date),
        lastLoginDate : formattedDate(date)
    }
    //store in localStorage
    storage.setItem(KEY,JSON.stringify(streak)) //how did storage.setitem become available by default ?
    return streak
}