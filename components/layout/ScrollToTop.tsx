"use client";

import { Affix, ActionIcon, Transition } from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <Affix position={{ bottom: 80, right: 20 }}>
      <Transition transition="slide-up" mounted={scroll.y > 400}>
        {(transitionStyles) => (
          <ActionIcon
            style={transitionStyles}
            onClick={() => scrollTo({ y: 0 })}
            size="lg"
            radius="xl"
            variant="filled"
            color="blue"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </ActionIcon>
        )}
      </Transition>
    </Affix>
  );
}
