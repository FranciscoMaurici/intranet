export default interface IProps {
  title?: string
  subTitle?: string
  imgSrc?: string
  extraContent?: string | JSX.Element | (() => JSX.Element)
}
