import {useFormik} from 'formik';

import {INVITE_VALIDATION_SCHEMA} from 'pages/manager/lib/validation';

import {Button} from 'shared/ui/button';
import {Container} from 'shared/ui/container';
import {Input} from 'shared/ui/input';
import {Text} from 'shared/ui/text';

export const Invite = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: INVITE_VALIDATION_SCHEMA,
    onSubmit() {
      //TODO: add endpoint
    },
  });

  return (
    <Container size="sm">
      <Text className="mt-11" size={20} weight={600}>
        Invite user by email
      </Text>
      <form onSubmit={formik.handleSubmit}>
        <Input
          error={formik.touched.email && formik.errors.email}
          id="email"
          label="Invitee email"
          name="email"
          placeholder="useremail@gmail.com"
          type="text"
          value={formik.values.email}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          onPaste={formik.handleBlur}
          onReset={formik.handleReset}
        />
        <Button className="mt-4 block-full" type="submit">
          Send invite
        </Button>
      </form>
    </Container>
  );
};
