import React from 'react';
import { render } from '@testing-library/react';
import { Test } from './test';
import { Task } from './App';

it('Test test', () => {
    const comp = render(<Test />)
    expect(comp).toBeDefined()
})

it('Task is defined', () => {
    const comp = render(<Task item = {{text: 'Test', done: true}} id = {'1'} removeTask = {() => {}}
        taskDone = {() => {}} editTask = {() => {}} />)
    expect(comp).toBeDefined()
})