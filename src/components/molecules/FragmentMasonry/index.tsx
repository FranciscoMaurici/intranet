import { MasonryColumn, MasonryItem, MasonryLayoutContainer } from './styles'
import { IProps } from './types'

const FragmentMasonry = ({
  columns = 2,
  gapSize = '1em',
  children,
}: IProps) => {
  const columnWrapper = {}
  const result = []

  const childrenTyped = (children as JSX.Element[]) || ([] as JSX.Element[])

  const spreadedChildren = childrenTyped.reduce((res, child) => {
    if (Array.isArray(child)) {
      return [...res, ...child]
    } else {
      return [...res, child]
    }
  }, [])

  // Create columns
  for (let i = 0; i < columns; i++) {
    columnWrapper[`column${i}`] = []
  }

  // Divide the children into columns
  for (let i = 0; i < spreadedChildren.length; i++) {
    const columnIndex = i % columns
    columnWrapper[`column${columnIndex}`].push(
      <MasonryColumn gapSize={gapSize} key={spreadedChildren[i].key}>
        {spreadedChildren[i]}
      </MasonryColumn>,
    )
  }

  // Wrap the items in each column with a div and push it into the result array
  for (let i = 0; i < columns; i++) {
    result.push(
      <MasonryItem gapSize={i > 0 ? gapSize : '0em'} key={`column${i}`}>
        {columnWrapper[`column${i}`]}
      </MasonryItem>,
    )
  }

  return <MasonryLayoutContainer>{result}</MasonryLayoutContainer>
}

export default FragmentMasonry
