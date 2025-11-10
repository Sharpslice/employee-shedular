import { Box, Flex, Text, TextInput } from "@mantine/core"
import type { Day } from "../../Interfaces/Day"
import { DateTime } from "luxon"
interface headerCellProp{
    day: Day
}

function weekDayFromIndex(num:number){
    switch(num){
        case 0:
            return "Sun"
        case 1:
            return "Mon"
        case 2:
            return "Tue"
        case 3:
            return "Wed"
        case 4:
            return "Thu"
        case 5:
            return "Fri"
        case 6:
            return "Sat"
                 
    }
}
function WeekHeaderCell({day}:headerCellProp){
 
        const isToday = DateTime.now().startOf('day').toISODate() === DateTime.fromISO(day.date).toUTC().toISODate()
        return (
            <Flex key={day.date} flex={1} direction={'column'}>
                <Box  bg={isToday ? 'blue': undefined}  
                        flex={1} style={{border:'1px solid black', textAlign:"center"}}>
                        <Text c={isToday? 'white': undefined} fw={isToday? 'bold': undefined}>
                            {`${weekDayFromIndex(day.days_of_week)} ${day.day_of_month}`}
                        </Text>       
                </Box>
                <TextInput 
                    variant="unstyled"
                    bd={'1px solid black'}
                    p={2}
                    styles={{input:{padding:'10px',fontSize:'18px'}}}
                />
            </Flex>
        )
}


export default WeekHeaderCell