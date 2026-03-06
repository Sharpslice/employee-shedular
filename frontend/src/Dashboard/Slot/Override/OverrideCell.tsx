import { Flex,Text } from "@mantine/core"
interface overrideProp{
    override_type: string
}
function OverrideCell({override_type}:overrideProp){
    return(
        <Flex justify={'center'}>
            <Text>
                {override_type}
            </Text>
        </Flex>
    )
}

export default OverrideCell


