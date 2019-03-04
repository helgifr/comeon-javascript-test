import React from 'react';
import { shallow } from 'enzyme';
import Categories from './Categories';

const categories = [
  {
    id: 0,
    name: "ALL"
  },
  {
    id: 1,
    name: "VIDEO SLOTS"
  },
  {
    id: 2,
    name: "SLOT MACHINES"
  }
];

describe('Categories Component', () => {
  const changeCategories = jest.fn();
  let wrapper = shallow(
    <Categories
      categories={categories}
      changeCategories={changeCategories}
    />
  );

  let categoryWrapper = wrapper.find('.category.item');

  it('should call the changeCategories function when category is clicked and with the index as argument', () => {
    categoryWrapper.forEach((category, index) => {
      category.shallow().simulate('click');
      expect(changeCategories).toHaveBeenCalledTimes(index + 1);
      expect(changeCategories).toHaveBeenCalledWith(index);
    });
  });

  const slotCategory = wrapper
    .find('.category.item > .content > .header')
    .filterWhere(el => el.text() === 'VIDEO SLOTS');

  it('should call the changeCategories with 1 as argument', () => {
    slotCategory.shallow().simulate('click');
    expect(changeCategories).toBeCalledWith(1);
  });

  it('should add the "clicked" class to the correct category', () => {
    const clicked = 1;
    wrapper = shallow(
      <Categories
        categories={categories}
        changeCategories={changeCategories}
        clicked={clicked}
      />
    );
    categoryWrapper = wrapper.find('.category.item');
    categoryWrapper.forEach((category, index) => {
      if (index === clicked) {
        expect(category.hasClass('clicked')).toBe(true);
      } else {
        expect(category.hasClass('clicked')).toBe(false);
      }
    })
  })
});