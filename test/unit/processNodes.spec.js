const convertNodeToElement = jasmine.createSpy('convertNodeToElement');

const processNodes = require('inject!processNodes')({
  './convertNodeToElement': convertNodeToElement
}).default;

describe('Testing `processNodes`', () => {

  beforeEach(() => {
    convertNodeToElement.calls.reset();
    convertNodeToElement.and.callFake(node => node);
  });

  it('should return the response from the transform function if it is not undefined', () => {
    const nodes = [
      'node1',
      'node2'
    ];
    const transform = node => `${node}_transformed`;
    expect(processNodes(nodes, transform)).toEqual([
      'node1_transformed',
      'node2_transformed'
    ]);
  });

  it('should return the response from the transform function if it is null', () => {
    const nodes = [
      'node1',
      'node2'
    ];
    const transform = () => null;
    expect(processNodes(nodes, transform)).toEqual([
      null,
      null
    ]);
  });

  it('should ignore the response from the transform function if it is undefined', () => {
    const nodes = [
      'node1',
      'node2'
    ];
    const transform = () => {};
    convertNodeToElement.and.callFake(node => `${node}_converted`);
    expect(processNodes(nodes, transform)).toEqual([
      'node1_converted',
      'node2_converted'
    ]);
  });

  it('should convert the node to an element if there is no transform function', () => {
    const nodes = [
      'node1',
      'node2'
    ];
    convertNodeToElement.and.callFake(node => `${node}_converted`);
    expect(processNodes(nodes)).toEqual([
      'node1_converted',
      'node2_converted'
    ]);
  });

});
