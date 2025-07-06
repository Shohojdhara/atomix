// Example: Different ways to import Atomix styles

// Method 1: Import compiled CSS (Recommended)
import '@shohojdhara/atomix/styles';

// Method 2: Import specific CSS file
import '@shohojdhara/atomix/dist/index.css';

// Method 3: Import via package exports
import '@shohojdhara/atomix/css';

// Method 4: Import minified CSS
import '@shohojdhara/atomix/css/min';

// Method 5: For SCSS projects - import source SCSS (legacy API)
import '@shohojdhara/atomix/scss';

// Method 6: For SCSS projects - import source SCSS with modern API (recommended)
import '@shohojdhara/atomix/scss/modern';

// Then use Atomix components
import { Button, Card, Avatar } from '@shohojdhara/atomix';

function App() {
  return (
    <div>
      <Card>
        <Avatar src="/avatar.jpg" alt="User" />
        <Button variant="primary">Click me</Button>
      </Card>
    </div>
  );
}

export default App;
