import {Link} from 'react-router-dom';

import {Container} from 'shared/ui/container';
import {Text} from 'shared/ui/text';

export const Forbidden = () => {
  return (
    <Container alignCenter justifyCenter row>
      <Text className="mt-9" size={20} weight={600}>
        You have not enough right to visit this page.
      </Text>
      <Text>You might want return to:</Text>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
      </ul>
    </Container>
  );
};
