import { Messages } from "../messages/index.js";
import { ip, ipv4, ipv6 } from "./ip.rule.js";

describe("rules:ip", () => {
  const ruleHandler = ip().handler;

  describe("auto-detect version", () => {
    test("should pass valid IPv4", () => {
      expect(ruleHandler("192.168.1.14")).toBe(true);
      expect(ruleHandler("0.0.0.0")).toBe(true);
      expect(ruleHandler("255.255.255.255")).toBe(true);
    });

    test("should pass valid IPv6", () => {
      expect(ruleHandler("2001:0db8:85a3:0000:0000:8a2e:0370:7334")).toBe(true);
      expect(ruleHandler("::1")).toBe(true);
    });

    test("should fail invalid", () => {
      expect(ruleHandler("invalid")).toBe(false);
      expect(ruleHandler(undefined)).toBe(false);
    });
  });
});

describe("rules:ip with version 4", () => {
  const ruleHandler = ip(["4"]).handler;

  describe("valid IPv4 addresses", () => {
    test("should pass standard IPv4", () => {
      expect(ruleHandler("192.168.1.14")).toBe(true);
      expect(ruleHandler("10.0.0.1")).toBe(true);
      expect(ruleHandler("172.16.0.1")).toBe(true);
    });

    test("should pass edge case values", () => {
      expect(ruleHandler("0.0.0.0")).toBe(true);
      expect(ruleHandler("255.255.255.255")).toBe(true);
      expect(ruleHandler("127.0.0.1")).toBe(true);
    });

    test("should pass single digit octets", () => {
      expect(ruleHandler("1.2.3.4")).toBe(true);
    });
  });

  describe("invalid IPv4 addresses", () => {
    test("should fail IPv6 address", () => {
      expect(ruleHandler("2001:0db8:85a3:0000:0000:8a2e:0370:7334")).toBe(false);
    });

    test("should fail with octet > 255", () => {
      expect(ruleHandler("256.1.1.1")).toBe(false);
      expect(ruleHandler("1.256.1.1")).toBe(false);
      expect(ruleHandler("1.1.256.1")).toBe(false);
      expect(ruleHandler("1.1.1.256")).toBe(false);
    });

    test("should fail with negative numbers", () => {
      expect(ruleHandler("-1.0.0.0")).toBe(false);
    });

    test("should fail with leading zeros", () => {
      expect(ruleHandler("01.01.01.01")).toBe(false);
      expect(ruleHandler("192.168.01.1")).toBe(false);
    });

    test("should fail with too few octets", () => {
      expect(ruleHandler("192.168.1")).toBe(false);
      expect(ruleHandler("192.168")).toBe(false);
    });

    test("should fail with too many octets", () => {
      expect(ruleHandler("192.168.1.1.1")).toBe(false);
    });

    test("should fail with non-numeric", () => {
      expect(ruleHandler("invalid")).toBe(false);
      expect(ruleHandler("192.168.1.a")).toBe(false);
    });

    test("should fail with non-string input", () => {
      expect(ruleHandler(undefined)).toBe(false);
      expect(ruleHandler(null as any)).toBe(false);
    });
  });
});

describe("rules:ip with version 6", () => {
  const ruleHandler = ip(["6"]).handler;

  describe("valid IPv6 addresses", () => {
    test("should pass full IPv6", () => {
      expect(ruleHandler("2001:0db8:85a3:0000:0000:8a2e:0370:7334")).toBe(true);
    });

    test("should pass compressed IPv6", () => {
      expect(ruleHandler("::1")).toBe(true);
      expect(ruleHandler("::")).toBe(true);
      expect(ruleHandler("2001:db8::1")).toBe(true);
    });

    test("should pass link-local", () => {
      expect(ruleHandler("fe80::1")).toBe(true);
      expect(ruleHandler("fe80::1:2:3:4")).toBe(true);
    });

    test("should pass with zone identifier", () => {
      expect(ruleHandler("fe80::1%eth0")).toBe(true);
      expect(ruleHandler("fe80::1%1")).toBe(true);
    });

    test("should pass IPv4-mapped IPv6", () => {
      expect(ruleHandler("::ffff:192.168.1.1")).toBe(true);
    });

    test("should pass lowercase and uppercase", () => {
      expect(ruleHandler("2001:DB8::1")).toBe(true);
      expect(ruleHandler("2001:db8::1")).toBe(true);
    });
  });

  describe("invalid IPv6 addresses", () => {
    test("should fail IPv4 address", () => {
      expect(ruleHandler("192.168.1.14")).toBe(false);
    });

    test("should fail with too many groups", () => {
      expect(ruleHandler("2001:0db8:85a3:0000:0000:8a2e:0370:7334:1234")).toBe(false);
    });

    test("should fail with invalid characters", () => {
      expect(ruleHandler("2001:0db8:85a3:0000:0000:8a2e:0370:ghij")).toBe(false);
    });

    test("should fail with multiple ::", () => {
      expect(ruleHandler("2001::db8::1")).toBe(false);
    });

    test("should fail invalid input", () => {
      expect(ruleHandler("invalid")).toBe(false);
      expect(ruleHandler(undefined)).toBe(false);
    });
  });
});

describe("rules:ipv4 (deprecated)", () => {
  const ruleHandler = ipv4().handler;

  test("should pass valid IPv4", () => {
    expect(ruleHandler("192.168.1.14")).toBe(true);
    expect(ruleHandler("10.0.0.1")).toBe(true);
  });

  test("should fail IPv6", () => {
    expect(ruleHandler("2001:0db8:85a3:0000:0000:8a2e:0370:7334")).toBe(false);
  });

  test("should fail invalid", () => {
    expect(ruleHandler("invalid")).toBe(false);
    expect(ruleHandler(undefined)).toBe(false);
  });
});

describe("rules:ipv6 (deprecated)", () => {
  const ruleHandler = ipv6().handler;

  test("should pass valid IPv6", () => {
    expect(ruleHandler("2001:0db8:85a3:0000:0000:8a2e:0370:7334")).toBe(true);
    expect(ruleHandler("::1")).toBe(true);
    expect(ruleHandler("fe80::1")).toBe(true);
  });

  test("should fail IPv4", () => {
    expect(ruleHandler("192.168.1.14")).toBe(false);
  });

  test("should fail invalid", () => {
    expect(ruleHandler("invalid")).toBe(false);
    expect(ruleHandler(undefined)).toBe(false);
  });
});

describe("messages", () => {
  test("message should exist", () => {
    expect(Messages.en_US.messages).toHaveProperty("ip");
    expect(Messages.en_US.messages).toHaveProperty("ipv4");
    expect(Messages.en_US.messages).toHaveProperty("ipv6");
  });
});
