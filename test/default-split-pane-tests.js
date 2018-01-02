import 'core-js/es6';

import React from 'react';
import SplitPane from '../src/SplitPane';
import Pane from '../src/Pane';
import Resizer from '../src/Resizer';
import asserter from './assertions/Asserter';
import {
  findRenderedComponentWithType,
  scryRenderedComponentsWithType,
} from 'react-dom/test-utils';
import {render, findDOMNode} from 'react-dom';

describe('Div panes', () => {

  describe('Defaults', () => {

    it('each Pane should have the same flex', () => {
      const jsx = (
        <SplitPane>
          <div>one</div>
          <div>two</div>
        </SplitPane>
      );

      asserter(jsx)
        .assertOrientation('vertical')
        .assertNumberOfPanes(2)
        .assertNumberOfResizers(1)
        .assertRatios([50, 50])
        .assertSizes([299.5, 299.5]);
    });

    it('each Pane should have the same flex', () => {
      const jsx = (
        <SplitPane>
          <div>one</div>
          <div>two</div>
          <div>three</div>
        </SplitPane>
      );

      asserter(jsx)
        .assertOrientation('vertical')
        .assertNumberOfPanes(3)
        .assertNumberOfResizers(2)
        .assertRatios([33, 33, 33])
        .assertSizes([199.33, 199.33, 199.33]);
    });
  });

  describe('Panes', () => {
    it('each Pane should have the same flex', () => {
      const jsx = (
        <SplitPane>
          <Pane>one</Pane>
          <Pane>two</Pane>
        </SplitPane>
      );

      asserter(jsx)
        .assertOrientation('vertical')
        .assertNumberOfPanes(2)
        .assertNumberOfResizers(1)
        .assertRatios([50, 50])
        .assertSizes([299.5, 299.5])
    });

    it('each Pane should have the same flex', () => {
      const jsx = (
        <SplitPane>
          <Pane>one</Pane>
          <Pane>two</Pane>
          <Pane>three</Pane>
        </SplitPane>
      );

      asserter(jsx)
        .assertOrientation('vertical')
        .assertNumberOfPanes(3)
        .assertNumberOfResizers(2)
        .assertRatios([33, 33, 33])
        .assertSizes([199.33, 199.33, 199.33]);
    });

    describe('initial sizes', () => {
      it('first pane', () => {
        const jsx = (
          <SplitPane>
            <Pane initialSize="250px">one</Pane>
            <Pane>two</Pane>
          </SplitPane>
        );

        asserter(jsx)
          .assertOrientation('vertical')
          .assertNumberOfPanes(2)
          .assertNumberOfResizers(1)
          .assertRatios([42, 58])
          .assertSizes([250, 349]);
      });

      it('second pane', () => {
        const jsx = (
          <SplitPane>
            <Pane>one</Pane>
            <Pane initialSize="250px">two</Pane>
          </SplitPane>
        );

        asserter(jsx)
          .assertOrientation('vertical')
          .assertNumberOfPanes(2)
          .assertNumberOfResizers(1)
          .assertRatios([58, 42])
          .assertSizes([349, 250]);
      });
    });

    describe('min sizes', () => {
      it('first pane', () => {
        const jsx = (
          <SplitPane>
            <Pane minSize="250px">one</Pane>
            <Pane>two</Pane>
          </SplitPane>
        );

        asserter(jsx)
          .assertOrientation('vertical')
          .assertNumberOfPanes(2)
          .assertNumberOfResizers(1)
          .assertRatios([50, 50])
          .assertSizes([299.5, 299.5]);
      });

      it('second pane', () => {
        const jsx = (
          <SplitPane>
            <Pane>one</Pane>
            <Pane minSize="250px">two</Pane>
          </SplitPane>
        );

        asserter(jsx)
          .assertOrientation('vertical')
          .assertNumberOfPanes(2)
          .assertNumberOfResizers(1)
          .assertMinSizes(['0px', '250px']);
      });
    });
  });

  describe('Drag resizer', () => {

    it('vertical divs', () => {
      const jsx = (
        <SplitPane>
          <div>one</div>
          <div>two</div>
        </SplitPane>
      );

      asserter(jsx)
        .assertRatios([50, 50])
        .assertSizes([299.5, 299.5])
        .dragResizer(0, {x: 20, y: 20})
        .assertSizes([319.47, 279.53])
        .assertRatios([53, 47])
    });

    it('horizontal divs', () => {
      const jsx = (
        <SplitPane split="horizontal">
          <div>one</div>
          <div>two</div>
        </SplitPane>
      );

      asserter(jsx)
        .assertRatios([50, 50])
        .assertSizes([299.5, 299.5])
        .dragResizer(0, {x: 0, y: 20})
        .assertSizes([319.47, 279.53])
        .assertRatios([53, 47])
      ;
    });

    it('vertical Panes', () => {
      const jsx = (
        <SplitPane split="vertical">
          <Pane>one</Pane>
          <Pane>two</Pane>
        </SplitPane>
      );

      asserter(jsx)
        .assertRatios([50, 50])
        .assertSizes([299.5, 299.5])
        .dragResizer(0, {x: 20, y: 0})
        .assertSizes([319.47, 279.53])
        .assertRatios([53, 47])
      ;
    });

    it('vertical Panes - resized all the way', () => {
      const jsx = (
        <SplitPane split="vertical">
          <Pane>one</Pane>
          <Pane>two</Pane>
        </SplitPane>
      );

      asserter(jsx)
        .assertRatios([50, 50])
        .assertSizes([299.5, 299.5])
        .dragResizer(0, {x: 300, y: 0})
        .assertSizes([599, 0])
        .assertRatios([100, 0])
      ;
    });

    it('horizontal Panes', () => {
      const jsx = (
        <SplitPane split="horizontal">
          <Pane>one</Pane>
          <Pane>two</Pane>
        </SplitPane>
      );

      asserter(jsx)
        .assertRatios([50, 50])
        .assertSizes([299.5, 299.5])
        .dragResizer(0, {x: 0, y: 20})
        .assertSizes([319.47, 279.53])
        .assertRatios([53, 47])
      ;
    });


    it('horizontal Panes - first pane resized fully', () => {
      const jsx = (
        <SplitPane split="horizontal">
          <Pane>one</Pane>
          <Pane>two</Pane>
        </SplitPane>
      );

      asserter(jsx)
        .assertRatios([50, 50])
        .assertSizes([299.5, 299.5])
        .dragResizer(0, {x: 0, y: 300})
        .assertSizes([599, 0])
        .assertRatios([100, 0])
      ;
    });

    it('horizontal Panes - second pane resized fully', () => {
      const jsx = (
        <SplitPane split="horizontal">
          <Pane>one</Pane>
          <Pane>two</Pane>
        </SplitPane>
      );

      asserter(jsx)
        .assertRatios([50, 50])
        .assertSizes([299.5, 299.5])
        .dragResizer(0, {x: 0, y: -300})
        .assertSizes([0, 599])
        .assertRatios([0, 100])
      ;
    });

    it('horizontal Panes - resize, max px size', () => {
      const jsx = (
        <SplitPane split="horizontal">
          <Pane maxSize="400px">one</Pane>
          <Pane>two</Pane>
        </SplitPane>
      );

      asserter(jsx)
        .assertRatios([50, 50])
        .assertSizes([299.5, 299.5])
        .dragResizer(0, {x: 0, y: 200})
        .assertSizes([399.33, 199.67])
        .assertRatios([67, 33])
      ;
    });

    it('horizontal Panes - resize, min px size', () => {
      const jsx = (
        <SplitPane split="horizontal">
          <Pane minSize="400px">one</Pane>
          <Pane>two</Pane>
        </SplitPane>
      );

      asserter(jsx)
        .assertRatios([67, 33])
        .assertSizes([400, 199])
        .dragResizer(0, {x: 0, y: 100})
        .assertSizes([501, 98.02])
        .assertRatios([83, 16])
      ;
    });


    describe('multiple horizontal Panes', () => {

      it('first resizer', () => {

        const jsx = (
          <SplitPane split="horizontal">
            <Pane>one</Pane>
            <Pane>two</Pane>
            <Pane>three</Pane>
            <Pane>four</Pane>
          </SplitPane>
        );

        asserter(jsx)
          .assertRatios([25, 25, 25, 25])
          .assertSizes([149.25, 149.25, 149.25, 149.25])
          .dragResizer(0, {x: 0, y: 20})
          .assertRatios([28, 22, 25, 25])
          .assertSizes([169.47, 129.53, 149, 149])
        ;
      });

      it('second resizer', () => {

        const jsx = (
          <SplitPane split="horizontal">
            <Pane>one</Pane>
            <Pane>two</Pane>
            <Pane>three</Pane>
            <Pane>four</Pane>
          </SplitPane>
        );

        asserter(jsx)
          .assertRatios([25, 25, 25, 25])
          .assertSizes([149.25, 149.25, 149.25, 149.25])
          .dragResizer(1, {x: 0, y: 20})
          .assertRatios([25, 28, 22, 25])
          .assertSizes([149, 169.47, 129.53, 149])
        ;
      });

      it('third resizer', () => {

        const jsx = (
          <SplitPane split="horizontal">
            <Pane>one</Pane>
            <Pane>two</Pane>
            <Pane>three</Pane>
            <Pane>four</Pane>
          </SplitPane>
        );

        asserter(jsx)
          .assertRatios([25, 25, 25, 25])
          .assertSizes([149.25, 149.25, 149.25, 149.25])
          .dragResizer(2, {x: 0, y: 20})
          .assertRatios([25, 25, 28, 22])
          .assertSizes([149, 149, 169.47, 129.53])
        ;
      });
    });

  });
});
