import { mount } from '@vue/test-utils'
import Counter from './counter'
import App from '@/App.vue'

describe('App.vue', () => {
    it('gives the current index as well as its predecessor and ancesstor in an array', () => {
        const array = [{
                "id": 1,
                "name": "one"
            },
            {
                "id": 2,
                "name": "one"
            },
            {
                "id": 3,
                "name": "one"
            },
            {
                "id": 4,
                "name": "one"
            },
            {
                "id": 5,
                "name": "one"
            },
            {
                "id": 6,
                "name": "one"
            }
        ]
        const wrapper = shallowMount(HelloWorld, {
            propsData: { msg }
        })

        //expect(wrapper.text()).to.include(msg)
        expect(App.$data.name).toBe('jkj');
    })
})