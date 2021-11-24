import React, {useEffect, useState} from "react";
import {
  Avatar,
  Grid,
  GridItem,
  Image,
  Text,
  Stack,
  SimpleGrid,
  Button,
  useRadioGroup,
  Box,
  useRadio,
  InputGroup,
  InputLeftElement,
  Input,
  RadioGroup,
  Icon,
} from "@chakra-ui/react";
import {BsPersonFill} from "react-icons/bs";

const App: React.FC = () => {
  const [bill, setBill] = React.useState<any>("");
  const [qty, setQty] = React.useState<any>("");
  const [tipPercent, setTipPercent] = React.useState<any>(0);
  const [customTip, setCustomTip] = React.useState<boolean>(false);
  const [enableResetButton, setEnableResetButton] = React.useState<boolean>(true);
  const [tipSplit, setTipSplit] = React.useState<number>(0);
  const [totalSplit, setTotalSplit] = React.useState<number>(0);

  const handleReset = (event: any) => {
    event.preventDefault();
    setBill("");
    setQty("");
    setTipPercent(0);
    setTipSplit(0);
    setTotalSplit(0);
    setEnableResetButton(true);
  };
  const handleBillBlur = (event: any) => {
    setBill(parseFloat(event.target.value).toFixed(2));
  };

  useEffect(() => {
    const triggerSplit = () => {
      if (bill != "" && tipPercent != 0 && qty != "") {
        setTipSplit((bill * tipPercent) / 100 / qty);
        setTotalSplit(bill / qty);
        setEnableResetButton(false);
      }
    };

    triggerSplit();
  }, [bill, tipPercent, qty]);
  const handleTipChange = () => {
    setCustomTip(false);
  };
  const handleQtyChange = (event: any) => {
    setQty(event.target.value);
  };

  const handleToggleButton = () => {
    setTipPercent(0);
    setCustomTip(!customTip);
  };

  function RadioCard(props: any) {
    const {getInputProps, getCheckboxProps} = useRadio(props);

    const input = getInputProps();
    const checkbox = getCheckboxProps();

    return (
      <Box as="label" onClick={() => handleTipChange()}>
        <input {...input} />
        <Box
          {...checkbox}
          _checked={{
            backgroundColor: "secondary.100",
            color: "primary.400",
          }}
          _hover={{
            backgroundColor: "primary.300",
            color: "primary.400",
          }}
          backgroundColor="primary.400"
          borderRadius="md"
          borderWidth="1px"
          boxShadow="md"
          cursor="pointer"
          fontSize="2xl"
          fontWeight="700"
          height={16}
          px={5}
          py={3}
          textAlign="center"
        >
          {props.children}%
        </Box>
      </Box>
    );
  }
  function TipPayment(props: any) {
    return (
      <Stack alignItems="center" direction="row" justifyContent="space-between">
        <Stack spacing={0}>
          <Text fontWeight="700">Tip Amount</Text>
          <Text>/ person</Text>
        </Stack>
        <Text color="secondary.100" fontSize="3xl" fontWeight="700">
          ${tipSplit.toFixed(2)}
        </Text>
      </Stack>
    );
  }

  function TotalPayment(props: any) {
    return (
      <Stack alignItems="center" direction="row" justifyContent="space-between">
        <Stack spacing={0}>
          <Text fontWeight="700">Total</Text>
          <Text>/ person</Text>
        </Stack>
        <Text color="secondary.100" fontSize="3xl" fontWeight="700">
          ${totalSplit.toFixed(2)}
        </Text>
      </Stack>
    );
  }
  const options = ["5", "10", "15", "20", "50"];

  const {getRootProps, getRadioProps} = useRadioGroup({
    name: "tipPercentGroup",
    onChange: setTipPercent,
  });

  const group = getRootProps();

  return (
    <Stack
      alignItems="center"
      backgroundColor="primary.700"
      color="whiteAlpha.900"
      height={[null, "100vh"]}
      justifyContent="center"
      paddingX={[8, 0]}
      paddingY={[12, null]}
      role="main"
      spacing={12}
      width="100%"
    >
      {/* Bill Select Tip % 5% 10% 15% 25% 50% Custom Number of People Tip Amount / person Total / person Reset */}
      <h1 style={{display: "none"}}>Frontend Mentor</h1>
      <Image alt="logo" src="/assets/logo.svg" width={24} />
      <SimpleGrid
        backgroundColor="secondary.200"
        borderRadius={16}
        columns={[1, 2]}
        gap={6}
        padding={6}
        width={[null, "container.lg"]}
      >
        <Stack>
          <Text color="primary.500" fontWeight="700">
            Bill
          </Text>
          <InputGroup>
            <InputLeftElement color="primary.500" fontSize="lg" pointerEvents="none">
              $
            </InputLeftElement>
            <Input
              _hover={{cursor: "pointer"}}
              color="primary.400"
              fontWeight="700"
              placeholder="0"
              step=".01"
              textAlign="right"
              type="number"
              value={bill}
              variant="filled"
              onBlur={handleBillBlur}
              onChange={(event) => setBill(event.target.value)}
            />
          </InputGroup>
          <Text color="primary.500" fontWeight="700">
            Select Tip %
          </Text>
          <SimpleGrid columns={[1, 3]} gap={4} {...group}>
            {options.map((value) => {
              const radio = getRadioProps({value});

              return (
                <RadioCard key={value} {...radio}>
                  {value}
                </RadioCard>
              );
            })}
            {customTip ? (
              <Input
                _hover={{cursor: "pointer"}}
                color="primary.400"
                fontWeight="700"
                height={16}
                placeholder="0"
                textAlign="right"
                type="number"
                value={tipPercent}
                variant="filled"
                onChange={(event) => setTipPercent(event.target.value)}
              />
            ) : (
              <Button
                color="primary.500"
                fontSize="xl"
                fontWeight="700"
                height={16}
                onClick={() => handleToggleButton()}
              >
                Custom
              </Button>
            )}
          </SimpleGrid>
          <Text color="primary.500" fontWeight="700">
            Number of People
          </Text>
          <InputGroup>
            <InputLeftElement color="primary.500" fontSize="lg" pointerEvents="none">
              <Icon as={BsPersonFill} width={6} />
            </InputLeftElement>
            <Input
              _hover={{cursor: "pointer"}}
              color="primary.400"
              fontWeight="700"
              placeholder="0"
              textAlign="right"
              type="number"
              value={qty}
              variant="filled"
              onChange={handleQtyChange}
            />
          </InputGroup>
        </Stack>
        <Stack
          backgroundColor="primary.400"
          borderRadius={8}
          height="40vh"
          justifyContent="space-between"
          padding={8}
        >
          <TipPayment />
          <TotalPayment />
          <form onSubmit={handleReset}>
            <Button
              _hover={{
                backgroundColor: "primary.300",
              }}
              bgColor="secondary.100"
              isDisabled={enableResetButton}
              textTransform="uppercase"
              type="submit"
              width="100%"
            >
              Reset
            </Button>
          </form>

          {/* _disabled={{color: "primary.400", backgroundColor: "secondary.100"}} */}
        </Stack>
      </SimpleGrid>
    </Stack>
  );
};

export default App;
