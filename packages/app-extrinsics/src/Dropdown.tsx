import React from 'react'
import Button from 'semantic-ui-react/dist/commonjs/elements/Button/Button';
import SUIDropdown from 'semantic-ui-react/dist/commonjs/modules/Dropdown/Dropdown';
import styled from 'styled-components'
import { Labelled } from '@polkadot/react-components';
import { classes } from '@polkadot/react-components/util';

type Props = React.ComponentProps<typeof SUIDropdown> & Pick<React.ComponentProps<typeof Labelled>, 'className' | 'help' | 'label' | 'labelExtra' | 'style' | 'withEllipsis' | 'withLabel'>

function Dropdown ({
  className,
  help,
  label,
  labelExtra,
  style,
  withEllipsis,
  withLabel,
  ...dropdownProps
}: Props): React.ReactElement {
  return dropdownProps.button ? (
    <Button.Group primary>
      <SUIDropdown {...dropdownProps} />
    </Button.Group>
  ) : (
    <Labelled
      className={classes('ui--Dropdown', className)}
      help={help}
      label={label}
      labelExtra={labelExtra}
      style={style}
      withEllipsis={withEllipsis}
      withLabel={withLabel}
    >
      <SUIDropdown {...dropdownProps} />
    </Labelled>
    );
  ;
}

export default styled(Dropdown)`
  .ui--Dropdown-item {
    position: relative;
    white-space: nowrap;

    .ui--Dropdown-icon,
    .ui--Dropdown-name {
      display: inline-block;
    }

    .ui--Dropdown-icon {
      height: 32px;
      left: 0;
      position: absolute;
      top: -9px;
      width: 32px;
    }

    .ui--Dropdown-name {
      margin-left: 3rem;
    }
  }

  .ui.selection.dropdown {
    > .text > .ui--Dropdown-item {
      .ui--Dropdown-icon {
        left: -2.6rem;
        top: -1.15rem;
        opacity: 1;
      }

      .ui--Dropdown-name {
        margin-left: 0;
      }
    }
  }
`;
