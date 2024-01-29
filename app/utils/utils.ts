export function validateEmail(email: unknown): email is string {
  return typeof email === "string" && email.length > 3 && email.includes("@");
}

export const compareByDate = (a: any, b: any): number => {
  return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
};
