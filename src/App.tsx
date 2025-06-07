import { useCallback, useEffect, useState, type FC } from 'react';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { ObjectView } from './ObjectView';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

const theme = createTheme({
  typography: {
    htmlFontSize: 14,
    body1: { fontSize: '0.75rem' },
  },
});

export const ViewScreen: FC = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!screen) return;

    const callbacks: VoidFunction[] = [];
    let isMounted = true;

    (async () => {
      const handler = (e: Event) => {
        console.count(e.type);

        if (!isMounted) return;

        setCount((count) => count + 1);
      };

      try {
        if (!screen) return;
        if (!isMounted) return;

        screen.addEventListener('change', handler);
        screen.orientation.addEventListener('change', handler);

        callbacks.push(() => {
          screen.removeEventListener('change', handler);
          screen.orientation.removeEventListener('change', handler);
        });
      } catch {}
    })();

    return () => {
      isMounted = false;
      callbacks.forEach((callback) => callback());
    };
  }, [screen]);

  return (
    <Paper sx={{ p: 2 }}>
      <Button
        type="button"
        onClick={() => setCount((count) => count + 1)}
        variant="outlined"
      >
        <span
          style={{
            color: '#666',
            fontFamily:
              'Menlo, Cascadia Code, Consolas, Liberation Mono, monospace, Monaco, "Courier New", monospace',
            fontWeight: 'normal',
          }}
        >
          <span style={{ color: '#333' }}>window</span>
          <span style={{ color: '#666' }}>.</span>
          <span style={{ color: '#333' }}>screen</span>
        </span>
      </Button>

      <Box mt={2} sx={{ overflowX: 'auto' }}>
        <ThemeProvider theme={theme}>
          <ObjectView value={screen} key={count}/>
        </ThemeProvider>
      </Box>
    </Paper>
  );
};

const initQueryPermissionStatus = async () => {
  return navigator.permissions.query({ name: "window-management" as any });
};

export const QueryWindowManagementPermissionStatus: FC = () => {
  const [count, setCount] = useState(0);

  const [permissionStatusPromise, setPermissionStatusPromise] = useState<
    Promise<PermissionStatus> | null
  >(initQueryPermissionStatus);

  const queryPermission = useCallback(async () => {
    setPermissionStatusPromise(initQueryPermissionStatus);
  }, []);

  useEffect(() => {
    if (!permissionStatusPromise) return;

    const callbacks: VoidFunction[] = [];
    let isMounted = true;

    (async () => {
      const handler = (e: Event) => {
        console.count(e.type);

        if (!isMounted) return;

        setCount((count) => count + 1);
      };

      try {
        const permissionStatus = await permissionStatusPromise;
        console.log(permissionStatus);

        if (!permissionStatus) return;
        if (!isMounted) return;

        permissionStatus.addEventListener('change', handler);

        callbacks.push(() => {
          permissionStatus.removeEventListener('change', handler);
        });
      } catch {}
    })();

    return () => {
      isMounted = false;
      callbacks.forEach((callback) => callback());
    };
  }, [permissionStatusPromise]);

  return (
    <Paper sx={{ p: 2 }}>
      <Button
        type="button"
        onClick={queryPermission}
        variant="outlined"
      >
        <span
          style={{
            color: '#666',
            fontFamily:
              'Menlo, Cascadia Code, Consolas, Liberation Mono, monospace, Monaco, "Courier New", monospace',
            fontWeight: 'normal',
          }}
        >
          <span style={{ color: '#333' }}>navigator</span>
          <span style={{ color: '#666' }}>.</span>
          <span style={{ color: '#333' }}>permissions</span>
          <span style={{ color: '#666' }}>.</span>
          <span style={{ color: '#000' }}>query</span>
          <span style={{ color: '#666' }}>(&#123; </span>
          <span style={{ color: '#333' }}>name:</span>
          <span style={{ color: '#666' }}> </span>
          <span style={{ color: '#1976d2' }}>"window-management"</span>
          <span style={{ color: '#666' }}> &#125;)</span>
        </span>
      </Button>

      <Box mt={2} sx={{ overflowX: 'auto' }}>
        <ThemeProvider theme={theme}>
          <ObjectView value={permissionStatusPromise} key={count}/>
        </ThemeProvider>
      </Box>
    </Paper>
  );
};

const initScreenDetails = async () => {
  return window.getScreenDetails();
};

export const ViewScreenDetails: FC = () => {
  const [count, setCount] = useState(0);

  const [screenDetailsPromise, setScreenDetailsPromise] = useState<
    Promise<ScreenDetails> | null
  >(initScreenDetails);

  const getScreenDetails = useCallback(async () => {
    setScreenDetailsPromise(initScreenDetails);
  }, []);

  useEffect(() => {
    if (!screenDetailsPromise) return;

    const callbacks: VoidFunction[] = [];
    let isMounted = true;

    (async () => {
      const handler = (e: Event) => {
        console.count(e.type);

        if (!isMounted) return;

        setCount((count) => count + 1);
      };

      try {
        const screenDetails = await screenDetailsPromise;
        console.log(screenDetails);

        if (!screenDetails) return;
        if (!isMounted) return;

        screenDetails.addEventListener('currentscreenchange', handler);
        screenDetails.addEventListener('screenschange', handler);
        screenDetails.currentScreen.addEventListener('change', handler);
        screenDetails.currentScreen.orientation.addEventListener('change', handler);

        callbacks.push(() => {
          screenDetails.removeEventListener('currentscreenchange', handler);
          screenDetails.removeEventListener('screenschange', handler);
          screenDetails.currentScreen.removeEventListener('change', handler);
          screenDetails.currentScreen.orientation.removeEventListener('change', handler);
        });

        for (const screenDetailed of screenDetails.screens) {
          screenDetailed.addEventListener('change', handler);
          screenDetailed.orientation.addEventListener('change', handler);

          callbacks.push(() => {
            screenDetailed.removeEventListener('change', handler);
            screenDetailed.orientation.removeEventListener('change', handler);
          });
        }
      } catch {}
    })();

    return () => {
      isMounted = false;
      callbacks.forEach((callback) => callback());
    };
  }, [screenDetailsPromise]);

  return (
    <Paper sx={{ p: 2 }}>
      <Button
        type="button"
        onClick={getScreenDetails}
        variant="outlined"
      >
        <span
          style={{
            color: '#666',
            fontFamily:
              'Menlo, Cascadia Code, Consolas, Liberation Mono, monospace, Monaco, "Courier New", monospace',
            fontWeight: 'normal',
          }}
        >
          <span style={{ color: '#333' }}>window</span>
          <span style={{ color: '#666' }}>.</span>
          <span style={{ color: '#000' }}>getScreenDetails</span>
          <span style={{ color: '#666' }}>()</span>
        </span>
      </Button>

      <Box mt={2} sx={{ overflowX: 'auto' }}>
        <ThemeProvider theme={theme}>
          <ObjectView value={screenDetailsPromise} key={count}/>
        </ThemeProvider>
      </Box>
    </Paper>
  );
};

export const App: FC = () => {
  return (
    <Stack gap={2} p={2} mx='auto'>
      <ViewScreen />
      <QueryWindowManagementPermissionStatus />
      <ViewScreenDetails />
    </Stack>
  );
};
