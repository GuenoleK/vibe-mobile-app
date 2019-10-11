// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Button } from '@material-ui/core';
// import { ButtonProps } from '@material-ui/core/Button';

// interface IButtonLinkProps extends ButtonProps {
//   link: string;
//   buttonClassName?: string;
//   label: string;
//   linkClassName?: string;
// }

// export class ButtonLink extends React.Component<IButtonLinkProps> {
//   render() {
//     const { link, label } = this.props;
//     const { buttonClassName, ...otherProps } = this.props;
//     const CustomLink = props => <Link to={link} className={this.linkClassName} {...props} />;
//     return (
//       <Button
//         {...otherProps}
//         className={this.buttonClassName}
//         component={CustomLink}
//         size="small"
//         color={this.props.color ? this.props.color : 'primary'}
//       >
//         {label}
//       </Button>
//     );
//   }

//   get buttonClassName() {
//     if (this.props.buttonClassName) {
//       return this.props.buttonClassName;
//     }
//     return '';
//   }

//   get linkClassName() {
//     if (this.props.linkClassName) {
//       return this.props.linkClassName;
//     }
//     return '';
//   }
// }
