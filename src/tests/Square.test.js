import { render, unmountComponentAtNode } from 'react-dom';
import { jest } from '@jest/globals';
import ReactTestUtils from 'react-dom/test-utils';
import { Square } from '../components/Square';


let container = null;
// テストのベースになるDOMを生成
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

// テスト後のDOMを削除
afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('Square', () => {
  it("Squareを作成", () => {
  
    const value = 'test';
    const mockFunc = jest.fn();
    const props = {
      value,
      onClick: mockFunc
    }
  
    render (Square(props), container);
    const target = container.firstChild;
    ReactTestUtils.Simulate.click(target);
  
    expect(target.getAttribute('class')).toBe('square');
    expect(target.textContent).toBe('test');
    expect(mockFunc).toHaveBeenCalled();
  });
})