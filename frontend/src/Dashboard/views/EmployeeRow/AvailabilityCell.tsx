import { Text } from "@mantine/core"

function AvailabilityCell({hidden}:{hidden:boolean}){
    return(
        <>
        {!hidden && <Text>test</Text>}
        </>
    )
}

export default AvailabilityCell