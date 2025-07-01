import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Design {
    id: string
    name: string
    number: string
    url: string
    image: string
    isPublished: boolean
}

export const useDesignStore = defineStore('designs', () => {
    const designs = ref<Design[]>([
        {
            id: '1',
            name: 'Ostrov',
            number: '105',
            url: 'https://example.com/poster1',
            image: '/designs/d1_2.png',
            isPublished: true,
        }
    ])

    function addDesign(design: Design) {
        console.log('ADDING DESIGN:', design)
        designs.value.push(design)
    }

    return {
        designs,
        addDesign
    }
})
