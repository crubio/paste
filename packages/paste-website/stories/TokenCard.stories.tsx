import * as React from 'react';
import Tokens from '@twilio-paste/design-tokens/dist/tokens.generic';
import {useTheme} from '@twilio-paste/theme';
import {Box} from '@twilio-paste/box';
import camelCase from 'lodash/camelCase';
import {TokenCard} from '../src/components/tokens-list/token-card';

import type {ComponentStory, ComponentMeta} from '@storybook/react';

const defaultThemeTokens = Tokens.tokens;

export default {
  title: 'Website/Token Card',
  component: TokenCard,
  argTypes: {
    backgroundColor: {
      control: false,
    },
    comment: {
      control: false,
    },
    name: {
      control: false,
    },
    category: {
      control: false,
    },
    value: {control: false},
    useCamelCase: {
      control: {type: 'boolean'},
    },
  },
} as ComponentMeta<typeof TokenCard>;

const Template: ComponentStory<typeof TokenCard> = ({name, category, useCamelCase}) => {
  const theme = useTheme();
  const categoryTokens = defaultThemeTokens[category];

  const backgroundColorToken = name.toLowerCase().includes('inverse')
    ? 'colorBackgroundBodyInverse'
    : 'colorBackgroundBody';
  const backgroundColor = theme.backgroundColors[backgroundColorToken];

  const {comment} =
    categoryTokens.find((token) => {
      return token.name === name;
    }) || {};
  let themeCategory: string;

  // todo: what is the mapping between pure tokens and theme tokens? category names are diff in some cases.
  switch (category) {
    case 'box-shadows':
      themeCategory = 'shadows';
      break;
    case 'spacings':
      themeCategory = 'space';
      break;
    case 'sizings':
      if (name.includes('icon')) {
        themeCategory = 'iconSizes';
      }
      themeCategory = 'sizes';
      break;

    default:
      themeCategory = camelCase(category);
      break;
  }

  const themeCategoryTokens = theme[themeCategory as keyof typeof theme];
  type CategoryTokens = typeof themeCategoryTokens;

  const themeTokenValue = themeCategoryTokens[camelCase(name) as unknown as keyof CategoryTokens];

  return (
    <Box as="ul" paddingLeft="space0">
      <TokenCard
        category={category}
        name={name}
        value={themeTokenValue}
        comment={comment}
        backgroundColor={backgroundColor}
        useCamelCase={useCamelCase}
      />
    </Box>
  );
};

export const BackgroundColorToken = Template.bind({});
BackgroundColorToken.args = {
  category: 'background-colors',
  name: 'color-background-available',
};

export const BackgroundColorTokenWithBorder = Template.bind({});
BackgroundColorTokenWithBorder.args = {
  category: 'background-colors',
  name: 'color-background-body',
};

export const BackgroundColorTokenInverse = Template.bind({});
BackgroundColorTokenInverse.args = {
  category: 'background-colors',
  name: 'color-background-inverse',
};

export const BorderColorToken = Template.bind({});
BorderColorToken.args = {
  category: 'border-colors',
  name: 'color-border',
};

export const BorderColorInverseToken = Template.bind({});
BorderColorInverseToken.args = {
  category: 'border-colors',
  name: 'color-border-inverse',
};

export const BorderWidthToken = Template.bind({});
BorderWidthToken.args = {
  category: 'border-widths',
  name: 'border-width-20',
};

export const BorderRadiusToken = Template.bind({});
BorderRadiusToken.args = {
  category: 'radii',
  name: 'border-radius-circle',
};

export const BoxShadowToken = Template.bind({});
BoxShadowToken.args = {
  category: 'box-shadows',
  name: 'shadow',
};

export const FontFamilyToken = Template.bind({});
FontFamilyToken.args = {
  category: 'fonts',
  name: 'font-family-code',
};

export const FontSizeToken = Template.bind({});
FontSizeToken.args = {
  category: 'font-sizes',
  name: 'font-size-110',
};

export const FontWeightToken = Template.bind({});
FontWeightToken.args = {
  category: 'font-weights',
  name: 'font-weight-bold',
};

export const LineHeightTokenLarge = Template.bind({});
LineHeightTokenLarge.args = {
  category: 'line-heights',
  name: 'line-height-110',
};

export const LineHeightTokenSmall = Template.bind({});
LineHeightTokenSmall.args = {
  category: 'line-heights',
  name: 'line-height-10',
};

export const SizingToken = Template.bind({});
SizingToken.args = {
  category: 'sizings',
  name: 'size-110',
};

export const SizingTokenIcon = Template.bind({});
SizingTokenIcon.args = {
  category: 'sizings',
  name: 'size-icon-110',
};

export const SizingTokenSquare = Template.bind({});
SizingTokenSquare.args = {
  category: 'sizings',
  name: 'size-square-200',
};

export const SpacingToken = Template.bind({});
SpacingToken.args = {
  category: 'spacings',
  name: 'space-150',
};

export const SpacingTokenNegative = Template.bind({});
SpacingTokenNegative.args = {
  category: 'spacings',
  name: 'space-negative-50',
};

export const SpacingTokenZero = Template.bind({});
SpacingTokenZero.args = {
  category: 'spacings',
  name: 'space-0',
};

export const TextColorToken = Template.bind({});
TextColorToken.args = {
  category: 'text-colors',
  name: 'color-text-success',
};

export const TextColorConditionalToken = Template.bind({});
TextColorConditionalToken.args = {
  category: 'text-colors',
  name: 'color-text-brand-highlight',
};
TextColorConditionalToken.parameters = {
  a11y: {
    config: {
      rules: [
        {
          id: 'color-contrast',
          // This story purposefully fails color contrast for small text
          enabled: false,
        },
      ],
    },
  },
};

export const ZIndexToken = Template.bind({});
ZIndexToken.args = {
  category: 'z-indices',
  name: 'z-index-90',
};