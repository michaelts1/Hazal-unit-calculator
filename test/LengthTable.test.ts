import { describe, expect, it } from 'vitest'
import LengthTable from '../src/components/LengthTable.vue'
import { mount } from '@vue/test-utils'
import type { Unit } from '../src/types'

describe('Component LengthTable', () => {
	it('exists', () => {
		expect(LengthTable).toBeTruthy()
	})

	const units: Unit[] = [
		{ hidden: false, name: 'אצבע', value: .005 },
		{ hidden: false, name: 'סנטימטר', value: .1 },
		{ hidden: false, name: 'טפח', value: 4 },
		{ hidden: false, name: 'זרת', value: 4000 },
	]
	const wrapper = mount(LengthTable, {
		props: {
			units,
		},
	})

	it('has a table with the correct number of columns', () => {
		expect(wrapper.find('table').exists()).toBe(true)
		expect(wrapper.findAll('th')).toHaveLength(units.length)
	})

	it('matches snapshot', () => {
		expect(wrapper.html()).toMatchSnapshot()
	})

	it('lists the correct values and reacts to value changes', async () => {
		expect(wrapper.text()).toContain('5 מ"מ')
		expect(wrapper.text()).toContain('4 מטר')
		expect(wrapper.text()).toContain('4 ק"מ')

		units[0].value = .5
		await wrapper.vm.$forceUpdate() // $forceUpdate is async (the type definition is wrong)
		expect(wrapper.text()).not.toContain('5 מ"מ')
		expect(wrapper.text()).toContain('50 ס"מ')
	})
})
