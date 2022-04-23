import {streakCounter} from '../src/index'
import {JSDOM} from 'jsdom'
import {formattedDate} from '../src/utlis'
describe('streakCounter',()=>{
    let mockLocalStorage: Storage;

    beforeEach(()=>{
        const mockJSDom = new JSDOM("", {url:"https://localhost"});
        mockLocalStorage = mockJSDom.window.localStorage
    })
    afterEach(()=>{
        mockLocalStorage.clear()
    })
    it('should return a streak object with currentCount, startDate and lastLoginDate', ()=>{
        const date = new Date()
        const streak = streakCounter(mockLocalStorage, date)

        expect(streak.hasOwnProperty('currentCount')).toBe(true)
        expect(streak.hasOwnProperty('startDate')).toBe(true)
        expect(streak.hasOwnProperty('lastLoginDate')).toBe(true)
    })
    it('should return a streak starting at 1 and keep track of last login date',()=>{
        const date = new Date()
        const streak = streakCounter(mockLocalStorage,date)

        
        const dateFormatted = formattedDate(date)

        expect(streak.currentCount).toBe(1)
        expect(streak.lastLoginDate).toBe(dateFormatted)
    })
    it('should store the streak in localStorage',()=>{
        const date = new Date()
        const key = 'streak'
        streakCounter(mockLocalStorage, date)

        const streakAsString = mockLocalStorage.getItem(key)
        expect(streakAsString).not.toBeNull()
    })
    describe('with a pre populated streak', ()=>{
        let mockLocalStorage : Storage
        beforeEach(()=>{
            const mockJSDom = new JSDOM('', {url:'https://localhost'})

            mockLocalStorage = mockJSDom.window.localStorage

            // use date in past so it's always the same
            const date = new Date('12/12/2021')

            const streak = {
                currentCount : 1,
                startDate : formattedDate(date),
                lastLoginDate : formattedDate(date)
            }

            mockLocalStorage.setItem('streak', JSON.stringify(streak))
        })
        afterEach(()=>{
            mockLocalStorage.clear()
        })
        it('should return the  saved streak from localStorage', ()=>{
            const date = new Date('12/12/2021')
            const streak = streakCounter(mockLocalStorage, date)
            // Should match the dates used to set up the tests
            expect(streak.startDate).toBe('12/12/2021')
        })
        it('should increment the streak couinter', ()=>{
            const date = new Date('12/13/2021') //notice this is the next day from prev
            const streak = streakCounter(mockLocalStorage,date)
            expect(streak.currentCount).toBe(2)
        })
        it('should not increment for discrete login dates', ()=>{
            const date = new Date('12/14/2021')
            const streak = streakCounter(mockLocalStorage, date)

            expect(streak.currentCount).toBe(1)
        })
        it('should sace the incemented state to local storage',()=>{
            const key = 'streak'
            const date = new Date('12/13/2021')
            //  call it once to update the streak
            streakCounter(mockLocalStorage,date)

            const streakAsString = mockLocalStorage.getItem(key)

            // Normally you should wrap in try/catch in case the JSON is bad
  // but since we authored it, we can skip here
            const streak = JSON.parse(streakAsString ||'')
            expect(streak.currentCount).toBe(2)
        })
        it('SHOULD RESET if not consecutive', ()=>{
            const date = new Date('12/13/2021')
            const streak = streakCounter(mockLocalStorage, date)

            expect(streak.currentCount).toBe(2)

            //skip a day => break he streak

            const dateUpdated = new Date('12/15/2021')
            const streakUpdated = streakCounter(mockLocalStorage, dateUpdated)

            expect(streakUpdated.currentCount).toBe(1)
        })
        it('should save the reset streak to localStorage', ()=>{
            const key = 'streak'
            const date = new Date('12/13/2021')
            // Call it once so it updates the streak
            streakCounter(mockLocalStorage, date)
            // Skip a day and break the streak
            const dateUpdated = new Date('12/15/2021')
            const streakUpdated = streakCounter(mockLocalStorage, dateUpdated)
            const streakAsString = mockLocalStorage.getItem(key)
            // Normally you should wrap in try/catch in case the JSON is bad
            // but since we authored it, we can skip here
            const streak = JSON.parse(streakAsString || '')
            expect(streak.currentCount).toBe(1)
        })
        it('should not reset streak for same day login', ()=>{
            const date = new Date('12/13/2021')
            // Call it once so it updates the streak
            streakCounter(mockLocalStorage, date)
            // Simulate same-day login
            const dateUpdated = new Date('12/13/2021')
            const streakUpdated = streakCounter(mockLocalStorage, dateUpdated)
            expect(streakUpdated.currentCount).toBe(2)
        })
    })
})