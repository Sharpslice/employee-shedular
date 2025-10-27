import { Button, Menu } from "@mantine/core"

function SlotMenu(){
    return(
    <>
        <Menu>
            <Menu.Target>
                <Button flex={1}>
                    slot
                </Button>
            </Menu.Target>

        </Menu>

    </>
    )
}

export default SlotMenu