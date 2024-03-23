import { useSetAtom } from 'jotai';
import { useEffect, useId, useRef, useState } from 'react';
import styled from 'styled-components';

import { DialogContentAtom } from '../atoms/DialogContentAtom';
import { Color, Space, Typography } from '../styles/variables';

import { Box } from './Box';
import { Button } from './Button';
import { Flex } from './Flex';
import { Spacer } from './Spacer';
import { Text } from './Text';

const _Button = styled(Button)`
  color: ${Color.MONO_A};
`;

const _Content = styled.section`
  white-space: pre-line;
`;

const Footer: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [term, setTerm] = useState("");
  const [contact, setContact] = useState("");
  const [question, setQuestion] = useState("");
  const [company, setCompany] = useState("");
  const [overview, setOverview] = useState("");

  useEffect(() => {
    setIsClient(true);
  }, []);

  const termDialogA11yId = useId();
  const contactDialogA11yId = useId();
  const questionDialogA11yId = useId();
  const companyDialogA11yId = useId();
  const overviewDialogA11yId = useId();

  const updateDialogContent = useSetAtom(DialogContentAtom);

  const handleRequestToTermDialogOpen = async () => {
    let termText = "";
    if (!term) {
      const res = await fetch('/api/v1/constants/term').then((res) => res.text());
      termText = JSON.parse(res).text;
      setTerm(termText);
    }
    updateDialogContent(
      <_Content aria-labelledby={termDialogA11yId} role="dialog">
        <Text as="h2" color={Color.MONO_100} id={termDialogA11yId} typography={Typography.NORMAL16}>
          利用規約
        </Text>
        <Spacer height={Space * 1} />
        <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
          {term !== "" ? term : termText}
        </Text>
      </_Content>,
    );
  };

  const handleRequestToContactDialogOpen = async () => {
    let contactText = "";
    if (!contact) {
      const res = await fetch('/api/v1/constants/contact').then((res) => res.text());
      contactText = JSON.parse(res).text;
      setContact(contactText);
    }
    updateDialogContent(
      <_Content aria-labelledby={contactDialogA11yId} role="dialog">
        <Text as="h2" color={Color.MONO_100} id={contactDialogA11yId} typography={Typography.NORMAL16}>
          お問い合わせ
        </Text>
        <Spacer height={Space * 1} />
        <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
          {contact !== "" ? contact : contactText}
        </Text>
      </_Content>,
    );
  };

  const handleRequestToQuestionDialogOpen = async () => {
    let questionText = "";
    if (!question) {
      const res = await fetch('/api/v1/constants/question').then((res) => res.text());
      questionText = JSON.parse(res).text;
      setQuestion(questionText);
    }
    updateDialogContent(
      <_Content aria-labelledby={questionDialogA11yId} role="dialog">
        <Text as="h2" color={Color.MONO_100} id={questionDialogA11yId} typography={Typography.NORMAL16}>
          Q&A
        </Text>
        <Spacer height={Space * 1} />
        <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
          {question !== "" ? question : questionText }
        </Text>
      </_Content>,
    );
  };

  const handleRequestToCompanyDialogOpen = async () => {
    let companyText = "";
    if (!company) {
      const res = await fetch('/api/v1/constants/company').then((res) => res.text());
      companyText = JSON.parse(res).text;
      setCompany(companyText);
    }
    updateDialogContent(
      <_Content aria-labelledby={companyDialogA11yId} role="dialog">
        <Text as="h2" color={Color.MONO_100} id={companyDialogA11yId} typography={Typography.NORMAL16}>
          運営会社
        </Text>
        <Spacer height={Space * 1} />
        <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
          {company !== "" ? company : companyText }
        </Text>
      </_Content>,
    );
  };

  const handleRequestToOverviewDialogOpen = async () => {
    let overviewText = "";
    if (!overview) {
      const res = await fetch('/api/v1/constants/overview').then((res) => res.text());
      overviewText = JSON.parse(res).text;
      setOverview(overviewText);
    }
    updateDialogContent(
      <_Content aria-labelledby={overviewDialogA11yId} role="dialog">
        <Text as="h2" color={Color.MONO_100} id={overviewDialogA11yId} typography={Typography.NORMAL16}>
          Cyber TOONとは
        </Text>
        <Spacer height={Space * 1} />
        <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
          {overview !== "" ? overview : overviewText }
        </Text>
      </_Content>,
    );
  };

  return (
    <Box as="footer" backgroundColor={Color.Background} p={Space * 1}>
      <Flex align="flex-start" direction="column" gap={Space * 1} justify="flex-start">
        <img alt="Cyber TOON" src="/assets/cyber-toon.svg" />
        <Flex align="start" direction="row" gap={Space * 1.5} justify="center">
          <_Button disabled={!isClient} onClick={handleRequestToTermDialogOpen}>
            利用規約
          </_Button>
          <_Button disabled={!isClient} onClick={handleRequestToContactDialogOpen}>
            お問い合わせ
          </_Button>
          <_Button disabled={!isClient} onClick={handleRequestToQuestionDialogOpen}>
            Q&A
          </_Button>
          <_Button disabled={!isClient} onClick={handleRequestToCompanyDialogOpen}>
            運営会社
          </_Button>
          <_Button disabled={!isClient} onClick={handleRequestToOverviewDialogOpen}>
            Cyber TOONとは
          </_Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export const LazyFooter = () => {
  const elemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.disconnect();
          if (!entry.target || !elemRef.current || !elemRef) return;
        }
      },
      {
        rootMargin: '20px',
      },
    );

    if (!elemRef.current) return;
    observer.observe(elemRef.current);

    return () => {
      if (!elemRef.current) return;
      observer.unobserve(elemRef.current);
    };
  }, []);

  return <div ref={elemRef}>{<Footer />}</div>;
};