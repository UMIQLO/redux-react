// @flow

export const onItemAdd = (payload: { id: number, text: string }) => (
    {
        type: 'ADD_ITEM',
        payload
    }
)

export const onItemDel = (id: number) => ({
    type: 'DEL_ITEM',
    id
})

export const onAddHistory = (history: { id: number, text: string, type: string }) => ({
    type: 'ADD_HISTORY',
    history
})

export const onRemoveHistory = (id: number) => ({
    type: 'REMOVE_HISTORY',
    id
})
