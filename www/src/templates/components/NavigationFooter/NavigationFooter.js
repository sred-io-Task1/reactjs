import Container from 'components/Container';
import Flex from 'components/Flex';
import Link from 'gatsby-link';
import PropTypes from 'prop-types';
import {colors, fonts, media} from 'theme';

const NavigationFooter = ({next, prev}) => (
  <div
    css={{
      background: colors.dark,
      color: colors.white,
      paddingTop: 50,
      paddingBottom: 50,
      position: 'relative',
      zIndex: 1,
    }}>
    <Container>
      <Flex type="ul" halign="space-between">
        <Flex basis="50%">
          {prev &&
            <div>
              <SecondaryLabel>Previous article</SecondaryLabel>
              <PrimaryLink to={prev}>
                {linkToTitle(prev)}
              </PrimaryLink>
            </div>}
        </Flex>
        {next &&
          <Flex
            halign="flex-end"
            basis="50%"
            css={{
              textAlign: 'right',
            }}>
            <div>
              <SecondaryLabel>Next article</SecondaryLabel>
              <PrimaryLink to={next}>
                {linkToTitle(next)}
              </PrimaryLink>
            </div>
          </Flex>}
      </Flex>
    </Container>
  </div>
);

NavigationFooter.propTypes = {
  next: PropTypes.string,
  prev: PropTypes.string,
};

export default NavigationFooter;

const linkToTitle = link => link.replace(/-/g, ' ').replace('.html', '');

const PrimaryLink = ({children, to}) => (
  <Link
    css={{
      display: 'block',
      paddingTop: 10,
      textTransform: 'capitalize',
      borderColor: colors.subtle,
      transition: 'border-color 0.2s ease',
      fontSize: 30,

      [media.largeDown]: {
        fontSize: 24,
      },
      [media.xsmall]: {
        fontSize: 16,
      },

      ':after': {
        display: 'block',
        content: '',
        borderTopWidth: 1,
        borderTopStyle: 'solid',
        borderColor: 'inherit',
        marginBottom: -1,
        position: 'relative',
      },
      ':hover': {
        borderColor: colors.white,
      },
    }}
    to={to}>
    {children}
  </Link>
);

const SecondaryLabel = ({children}) => (
  <div
    css={{
      color: colors.brand,
      ...fonts.small,
    }}>
    {children}
  </div>
);
