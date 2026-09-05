import { queryNeon } from '../../../lib/neon-client';
import { isAdminAuthenticated } from '../auth';
import { updatePricingSettings } from '../actions';

type SettingRow = { key: string; value: { value?: number | boolean } };
type RuleRow = { min_cost: string; max_cost: string | null; margin_percent: string };

export default async function AdminSettingsPage() {
  if (!(await isAdminAuthenticated())) return <p>Prihláste sa cez administračný vstup.</p>;
  const [settings, rules] = await Promise.all([
    queryNeon<SettingRow>(`SELECT key, value FROM store_settings WHERE key IN ('pricing.vat_rate', 'feed.minimum_cost_eur', 'checkout.allow_private_purchase')`),
    queryNeon<RuleRow>('SELECT min_cost, max_cost, margin_percent FROM pricing_rules WHERE active = true ORDER BY display_order, min_cost'),
  ]);
  const values = new Map(settings.map((row) => [row.key, row.value?.value ?? 0]));
  const allowPrivatePurchase = values.get('checkout.allow_private_purchase') !== false;
  const normalizedRules = rules.length ? rules : [
    { min_cost: '0', max_cost: '100', margin_percent: '3' },
    { min_cost: '100', max_cost: '300', margin_percent: '8' },
    { min_cost: '300', max_cost: '1000', margin_percent: '12' },
    { min_cost: '1000', max_cost: null, margin_percent: '10' },
  ];
  return <div className="mx-auto max-w-4xl space-y-6">
    <div><h2 className="text-2xl font-bold">Obchodné nastavenia</h2><p className="mt-1 text-sm text-slate-600">Tieto hodnoty používa ďalší import aj synchronizácia cien.</p></div>
    <form action={updatePricingSettings} className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-semibold">DPH (%)<input name="vat_rate" type="number" min="0" max="100" step="0.01" defaultValue={Number(values.get('pricing.vat_rate') ?? 20)} className="mt-1 w-full rounded-lg border p-2 font-normal" /></label>
        <label className="text-sm font-semibold">Minimálna nákupná cena feedu (€)<input name="minimum_cost_eur" type="number" min="0" step="0.01" defaultValue={Number(values.get('feed.minimum_cost_eur') ?? 0)} className="mt-1 w-full rounded-lg border p-2 font-normal" /></label>
        <label className="flex items-center gap-3 text-sm font-semibold sm:col-span-2"><input name="allow_private_purchase" type="checkbox" value="true" defaultChecked={allowPrivatePurchase} className="h-4 w-4" /><span>Povoliť nákup súkromným osobám<span className="mt-1 block text-xs font-normal text-slate-500">Ak je vypnuté, objednávať môžu iba právnické osoby s IČO a DIČ.</span></span></label>
      </div>
      <div><h3 className="font-bold">Marža podľa nákupnej ceny</h3><p className="mb-3 text-xs text-slate-500">Prázdne maximum znamená bez horného limitu.</p><div className="space-y-2">
        {Array.from({ length: 6 }, (_, index) => { const row = normalizedRules[index]; return <div key={index} className="grid grid-cols-[1fr_1fr_1fr] gap-2"><input aria-label={`Pásmo ${index + 1} od`} name={`margin_${index + 1}_min`} type="number" min="0" step="0.01" placeholder="Od €" defaultValue={row?.min_cost ?? ''} className="rounded-lg border p-2" /><input aria-label={`Pásmo ${index + 1} do`} name={`margin_${index + 1}_max`} type="number" min="0" step="0.01" placeholder="Do €" defaultValue={row?.max_cost ?? ''} className="rounded-lg border p-2" /><div className="relative"><input aria-label={`Pásmo ${index + 1} marža`} name={`margin_${index + 1}_percent`} type="number" step="0.01" placeholder="Marža %" defaultValue={row?.margin_percent ?? ''} className="w-full rounded-lg border p-2 pr-8" /><span className="absolute right-3 top-2 text-slate-400">%</span></div></div>; })}
      </div></div>
      <button className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700">Uložiť nastavenia</button>
    </form>
  </div>;
}
