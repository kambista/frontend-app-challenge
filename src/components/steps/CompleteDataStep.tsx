import { useCallback, useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Dimensions,
    Pressable,
    Text,
    View,
} from "react-native";
import BottomSheetModal from "../BottomSheetModal";
import Button from "../Button";
import CheckboxField from "../CheckboxField";
import Icon from "../Icon";
import Input from "../Input";
import SelectField from "../SelectField";
import { CARD_ELEVATION_STYLE } from "../../constants/colors";
import {
    createCuentaUsuario,
    getBanks,
    getCuentasUsuario,
    getSourceFunds,
} from "../../services/exchanges/exchanges.service";
import type {
    Bank,
    CreateCuentaUsuarioPayload,
    CuentaUsuario,
    SourceFund,
} from "../../services/exchanges/exchanges.types";
import { useExchangeStore } from "../../stores/exchange/exchangeStore";
import { useAuthStore } from "../../stores/auth/authStore";
import { maskAccountNumber } from "../../utils/maskAccountNumber";

type CompleteDataStepProps = {
    onContinue: () => void;
};

type DestinationAccountRow = {
    id: string;
    alias: string;
    bankName: string;
    currencyLabel: string;
    maskedNumber: string;
};

function mapCuentaUsuarioToRow(cuenta: CuentaUsuario, bankList: Bank[]): DestinationAccountRow {
    const bank = bankList.find((b) => b.id === cuenta.entidadId);
    return {
        id: String(cuenta.id),
        alias: cuenta.alias,
        bankName: bank?.name ?? bank?.alias ?? "Cuenta",
        currencyLabel: cuenta.moneda,
        maskedNumber: maskAccountNumber(cuenta.numeroCuenta),
    };
}

const WINDOW_H = Dimensions.get("window").height;
const SHEET_BANK_H = Math.round(WINDOW_H * 0.55);
const SHEET_DESTINATION_H = Math.round(WINDOW_H * 0.52);
const SHEET_ADD_ACCOUNT_H = Math.round(WINDOW_H * 0.74);
const SHEET_ENTITY_H = Math.round(WINDOW_H * 0.55);

export default function CompleteDataStep({ onContinue }: CompleteDataStepProps) {
    const { sendAmount, receiveAmount, tab, setData, originBankId, destinationCuentaId, sourceFundId } =
        useExchangeStore((s) => s);

    const [formCuentaUsuario, setFormCuentaUsuario] = useState<CreateCuentaUsuarioPayload>({
        userId: 0,
        tipoCuenta: "Ahorros",
        entidadId: 0,
        numeroCuenta: "",
        moneda: "USD",
        alias: "",
        esPropietario: false,
    });
    const [banks, setBanks] = useState<Bank[]>([]);
    const [sourceFunds, setSourceFunds] = useState<SourceFund[]>([]);
    const [catalogLoading, setCatalogLoading] = useState(true);
    const [catalogError, setCatalogError] = useState<string | null>(null);
    const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
    const [bankModalOpen, setBankModalOpen] = useState(false);
    const [selectedSourceFund, setSelectedSourceFund] = useState<SourceFund | null>(null);
    const [sourceFundModalOpen, setSourceFundModalOpen] = useState(false);
    const [destinationAccounts, setDestinationAccounts] = useState<DestinationAccountRow[]>([]);
    const [selectedDestinationAccount, setSelectedDestinationAccount] = useState<DestinationAccountRow | null>(null);
    const [destinationAccountModalOpen, setDestinationAccountModalOpen] = useState(false);
    const [addAccountModalOpen, setAddAccountModalOpen] = useState(false);
    const [accountTypeModalOpen, setAccountTypeModalOpen] = useState(false);
    const [entityModalOpen, setEntityModalOpen] = useState(false);
    const user = useAuthStore((s) => s.user);
    const userId = user && user.id > 0 ? user.id : undefined;

    const loadCatalogs = useCallback(async () => {
        setCatalogLoading(true);
        setCatalogError(null);

        try {
            const [banksRes, fundsRes] = await Promise.all([
                getBanks(),
                getSourceFunds(),
            ]);
            const bankList = banksRes.data.success ? banksRes.data.data : [];
            if (banksRes.data.success) setBanks(bankList);
            if (fundsRes.data.success) setSourceFunds(fundsRes.data.data);

            if (userId) {
                const cuentasRes = await getCuentasUsuario(userId);
                if (cuentasRes.data.success) {
                    setDestinationAccounts(
                        cuentasRes.data.data.map((c) => mapCuentaUsuarioToRow(c, bankList)),
                    );
                } else {
                    setDestinationAccounts([]);
                }
            } else {
                setDestinationAccounts([]);
            }
        } catch {
            setCatalogError("No se pudieron cargar los catálogos. Intenta de nuevo.");
        } finally {
            setCatalogLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        loadCatalogs();
    }, [loadCatalogs]);

    useEffect(() => {
        if (catalogLoading || catalogError) return;

        if (originBankId != null) {
            const b = banks.find((x) => x.id === originBankId);
            if (b) setSelectedBank(b);
        }
        if (sourceFundId != null) {
            const f = sourceFunds.find((x) => x.id === sourceFundId);
            if (f) setSelectedSourceFund(f);
        }
        if (destinationCuentaId != null) {
            const acc = destinationAccounts.find((x) => x.id === destinationCuentaId);
            if (acc) setSelectedDestinationAccount(acc);
        }
    }, [
        catalogLoading,
        catalogError,
        banks,
        sourceFunds,
        destinationAccounts,
        originBankId,
        destinationCuentaId,
        sourceFundId,
    ]);

    const openBankModal = () => {
        setBankModalOpen(true);
    };

    const openSourceFundModal = () => {
        setSourceFundModalOpen(true);
    };

    const openAddAccountModal = () => {
        setDestinationAccountModalOpen(false);
        setFormCuentaUsuario((prev) => ({
            ...prev,
            tipoCuenta: "Ahorros",
            entidadId: 0,
            numeroCuenta: "",
            moneda: prev.moneda,
            alias: "",
            esPropietario: false,
        }));
        setAddAccountModalOpen(true);
    };

    const selectDisabled = catalogLoading || Boolean(catalogError);

    const allMainSelectsFilled =
        selectedBank !== null &&
        selectedDestinationAccount !== null &&
        selectedSourceFund !== null;

    const canContinue = allMainSelectsFilled && !selectDisabled;

    const entityNameLabel =
        banks.find((b) => b.id === formCuentaUsuario.entidadId)?.alias ?? "";

    const hasValidEntityInCatalog = banks.some((b) => b.id === formCuentaUsuario.entidadId);

    const handleSaveAccount = async () => {
        const numeroCuenta = formCuentaUsuario.numeroCuenta.trim();
        const aliasCuenta = formCuentaUsuario.alias.trim();

        if (
            !numeroCuenta ||
            !aliasCuenta ||
            !formCuentaUsuario.esPropietario ||
            !hasValidEntityInCatalog
        )
            return;

        if (!userId) {
            Alert.alert("Sesión", "Inicia sesión para registrar una cuenta.");
            return;
        }

        try {
            const res = await createCuentaUsuario({
                ...formCuentaUsuario,
                userId,
                numeroCuenta,
                alias: aliasCuenta,
            });
            
            if (!res.data.success) return;

            setAddAccountModalOpen(false);

            const listRes = await getCuentasUsuario(userId);
            if (listRes.data.success) {
                const rows = listRes.data.data.map((c) =>
                    mapCuentaUsuarioToRow(c, banks),
                );
                setDestinationAccounts(rows);
                const row = mapCuentaUsuarioToRow(res.data.data, banks);
                setSelectedDestinationAccount(row);
                setData({ destinationCuentaId: row.id });
            }
        } catch {
            Alert.alert("Error", "No se pudo guardar la cuenta. Intenta de nuevo.");
        }
    };

    return (
        <View>
            <View
                className="mb-4 rounded-2xl bg-white p-5"
                style={CARD_ELEVATION_STYLE}
            >
                <View className="mb-3 flex-row justify-between">
                    <Text className="text-sm text-kambista-muted">Tú envías</Text>
                    <Text className="text-base font-bold text-kambista-navy">
                        {tab === "compra" ? "$ " + sendAmount : "S/ " + sendAmount}
                    </Text>
                </View>
                <View className="mb-3 flex-row justify-between">
                    <Text className="text-sm text-kambista-muted">Tú recibes</Text>
                    <Text className="text-base font-bold text-kambista-navy">
                        {tab === "compra" ? "S/ " + receiveAmount : "$ " + receiveAmount}
                    </Text>
                </View>
                <View className="mb-4 flex-row justify-between">
                    <Text className="text-sm text-kambista-muted">Cupón aplicado</Text>
                    <Text className="text-base font-bold text-kambista-navy">
                        MICASA21
                    </Text>
                </View>
                <View className="mb-4 h-px bg-kambista-border" />
                <View className="flex-row justify-between">
                    <Text className="mb-2 text-sm text-kambista-muted">
                        Tipo de cambio utilizado
                    </Text>
                    <View className="flex-row items-baseline gap-3">
                        <Text className="text-md font-bold text-red-500 line-through">
                            3.422
                        </Text>
                        <Text className="text-md font-bold text-kambista-navy">3.433</Text>
                    </View>
                </View>
            </View>

            <View className="mb-5 flex-row rounded-xl bg-kambista-infoBg px-3 py-3">
                <Icon
                    name="information-circle"
                    size={22}
                    color="#1E3A5F"
                    style={{ marginRight: 10, marginTop: 2 }}
                />
                <Text className="flex-1 text-sm leading-5 text-kambista-infoText">
                    Tiempo estimado de espera{" "}
                    <Text className="font-bold text-kambista-infoText">
                        BCP, Interbank, BanBif, Pichincha
                    </Text>
                    : 15 minutos.{" "}
                    <Text className="font-bold text-kambista-infoText">Otros bancos</Text>
                    : 1 día hábil
                </Text>
            </View>

            {catalogLoading ? (
                <View className="mb-4 items-center py-2">
                    <ActivityIndicator />
                </View>
            ) : null}

            {catalogError ? (
                <Pressable onPress={() => void loadCatalogs()} className="mb-4">
                    <Text className="text-center text-sm text-red-600">{catalogError}</Text>
                    <Text className="mt-1 text-center text-sm text-kambista-navy underline">
                        Reintentar
                    </Text>
                </Pressable>
            ) : null}

            <View className="mb-4">
                <Text className="mb-2 text-xs text-kambista-muted">
                    ¿Desde qué banco nos envías tu dinero?
                </Text>
                <SelectField
                    placeholder="Selecciona"
                    value={selectedBank?.alias}
                    onPress={openBankModal}
                    disabled={selectDisabled}
                    className="border-kambista-border"
                />
            </View>

            <View className="mb-4">
                <Text className="mb-2 text-xs text-kambista-muted">
                    ¿A qué cuenta bancaria transferimos tus soles?
                </Text>
                <SelectField
                    placeholder="Selecciona"
                    value={
                        selectedDestinationAccount
                            ? `${selectedDestinationAccount.alias}`
                            : undefined
                    }
                    onPress={() => setDestinationAccountModalOpen(true)}
                    disabled={selectDisabled}
                    className="border-kambista-border"
                />
            </View>

            <View className="mb-5 flex-row rounded-xl bg-[#FFF4E6] px-3 py-3">
                <Icon
                    name="information-circle"
                    size={22}
                    color="#B45309"
                    style={{ marginRight: 10, marginTop: 2 }}
                />
                <Text className="flex-1 text-sm leading-5 text-[#92400E]">
                    Recuerda que las cuentas deben estar{" "}
                    <Text className="font-bold">a tu nombre</Text>. Kambista no transfiere
                    a <Text className="font-bold">cuentas de terceros</Text>
                </Text>
            </View>

            <View className="mb-4">
                <Text className="mb-2 text-xs text-kambista-muted">Origen de fondos</Text>
                <SelectField
                    placeholder="Selecciona"
                    value={selectedSourceFund?.name}
                    onPress={openSourceFundModal}
                    disabled={selectDisabled}
                    className="border-kambista-border"
                />
            </View>

            <View className="mt-6">
                <Button
                    variant="fill"
                    tone="cyanNavy"
                    onPress={onContinue}
                    disabled={!canContinue}
                >
                    CONTINUAR
                </Button>
            </View>

            {/* Modal del banco seleccionado */}
            <BottomSheetModal
                visible={bankModalOpen}
                onRequestClose={() => setBankModalOpen(false)}
                showHeaderActions={false}
                title="¿Desde qué banco nos envías tu dinero?"
                contentMaxHeight={SHEET_BANK_H}
            >
                {banks.map((b, index) => (
                    <View key={b.id}>
                        <Pressable
                            className="px-4 py-3"
                            onPress={() => {
                                setSelectedBank(b);
                                setData({ originBankId: b.id });
                                setBankModalOpen(false);
                            }}
                        >
                            <Text className="text-left text-base text-kambista-navy">
                                {b.name}
                            </Text>
                        </Pressable>
                        {index < banks.length - 1 ? (
                            <View className="mx-4 h-px bg-kambista-border" />
                        ) : null}
                    </View>
                ))}
            </BottomSheetModal>

            {/* Modal del origen de fondos seleccionado */}
            <BottomSheetModal
                visible={sourceFundModalOpen}
                onRequestClose={() => setSourceFundModalOpen(false)}
                showHeaderActions={false}
                title="Origen de fondos"
                contentMaxHeight={SHEET_BANK_H}
            >
                {sourceFunds.map((f, index) => (
                    <View key={f.id}>
                        <Pressable
                            className="px-4 py-3"
                            onPress={() => {
                                setSelectedSourceFund(f);
                                setData({ sourceFundId: f.id });
                                setSourceFundModalOpen(false);
                            }}
                        >
                            <Text className="text-left text-base text-kambista-navy">
                                {f.name}
                            </Text>
                        </Pressable>
                        {index < sourceFunds.length - 1 ? (
                            <View className="mx-4 h-px bg-kambista-border" />
                        ) : null}
                    </View>
                ))}
            </BottomSheetModal>

            {/* Modal de la cuenta destino seleccionada */}
            <BottomSheetModal
                visible={destinationAccountModalOpen}
                onRequestClose={() => setDestinationAccountModalOpen(false)}
                showHeaderActions={false}
                title="Selecciona tu cuenta destino"
                contentMaxHeight={SHEET_DESTINATION_H}
            >
                {destinationAccounts.map((acc, index) => (
                    <View key={acc.id}>
                        <Pressable
                            className="px-4 py-4"
                            onPress={() => {
                                setSelectedDestinationAccount(acc);
                                setData({ destinationCuentaId: acc.id });
                                setDestinationAccountModalOpen(false);
                            }}
                        >
                            <Text className="text-base font-semibold text-kambista-navy">
                                {acc.alias} - {acc.bankName} - {acc.currencyLabel}
                            </Text>
                            <Text className="mt-1 text-sm text-kambista-muted">
                                {acc.maskedNumber}
                            </Text>
                        </Pressable>
                        {index < destinationAccounts.length - 1 ? (
                            <View className="mx-4 h-px bg-kambista-border" />
                        ) : null}
                    </View>
                ))}
                <View className="mx-4 h-px bg-kambista-border" />
                <Pressable
                    className="flex-row items-center gap-3 px-4 py-4"
                    onPress={openAddAccountModal}
                >
                    <View className="h-12 w-12 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white">
                        <Icon name="add" size={26} color="#1E3A5F" />
                    </View>
                    <Text className="text-base font-semibold text-kambista-navy">
                        Agregar cuenta
                    </Text>
                </Pressable>
            </BottomSheetModal>

            {/* Modal de agregar cuenta destino */}
            <BottomSheetModal
                visible={addAccountModalOpen}
                onRequestClose={() => setAddAccountModalOpen(false)}
                showHeaderActions={false}
                title={
                    formCuentaUsuario.moneda === "PEN"
                        ? "Agregar cuenta soles"
                        : "Agregar cuenta dólares"
                }
                contentMaxHeight={SHEET_ADD_ACCOUNT_H}
            >
                <View className="px-4 pb-6">
                    <Text className="mb-4 text-sm leading-5 text-kambista-navy">
                        La cuenta que registres{" "}
                        <Text className="font-bold">debe estar a tu nombre</Text>{" "}
                        (titular de este perfil en Kambista).
                    </Text>

                    <Text className="mb-2 text-xs text-kambista-muted">
                        Tipo de cuenta bancaria
                    </Text>
                    <SelectField
                        placeholder="Selecciona"
                        value={formCuentaUsuario.tipoCuenta}
                        onPress={() => setAccountTypeModalOpen(true)}
                        className="mb-4 border-kambista-border"
                    />

                    <Text className="mb-2 text-xs text-kambista-muted">
                        Entidad financiera
                    </Text>
                    <SelectField
                        placeholder="Selecciona"
                        value={entityNameLabel}
                        onPress={() => {
                            if (banks.length > 0) setEntityModalOpen(true);
                        }}
                        disabled={banks.length === 0}
                        className="mb-4 border-kambista-border"
                    />

                    <View className="mb-4 flex-row rounded-xl bg-kambista-infoBg px-3 py-3">
                        <Icon
                            name="information-circle"
                            size={22}
                            color="#1E3A5F"
                            style={{ marginRight: 10, marginTop: 2 }}
                        />
                        <Text className="flex-1 text-sm leading-5 text-kambista-infoText">
                            Operamos en Lima con todos los bancos. Y en provincia con el BCP
                            y cuentas digitales Interbank.
                        </Text>
                    </View>

                    <Text className="mb-2 text-xs text-kambista-muted">Moneda</Text>
                    <View className="mb-4 flex-row gap-2">
                        <Pressable
                            className={`flex-1 items-center rounded-xl border-2 py-3 ${formCuentaUsuario.moneda === "PEN" ? "border-kambista-navy bg-kambista-navy" : "border-kambista-navy bg-white"}`}
                            onPress={() =>
                                setFormCuentaUsuario((prev) => ({ ...prev, moneda: "PEN" }))
                            }
                        >
                            <Text
                                className={`text-sm font-semibold ${formCuentaUsuario.moneda === "PEN" ? "text-white" : "text-kambista-navy"}`}
                            >
                                SOLES
                            </Text>
                        </Pressable>
                        <Pressable
                            className={`flex-1 items-center rounded-xl border-2 py-3 ${formCuentaUsuario.moneda === "USD" ? "border-kambista-navy bg-kambista-navy" : "border-kambista-navy bg-white"}`}
                            onPress={() =>
                                setFormCuentaUsuario((prev) => ({ ...prev, moneda: "USD" }))
                            }
                        >
                            <Text
                                className={`text-sm font-semibold ${formCuentaUsuario.moneda === "USD" ? "text-white" : "text-kambista-navy"}`}
                            >
                                DÓLARES
                            </Text>
                        </Pressable>
                    </View>

                    <Text className="mb-2 text-xs text-kambista-muted">Número de cuenta</Text>
                    <Input
                        placeholder="Escribe tu cuenta de destino"
                        keyboardType="number-pad"
                        value={formCuentaUsuario.numeroCuenta}
                        onChangeText={(numeroCuenta) =>
                            setFormCuentaUsuario((prev) => ({ ...prev, numeroCuenta }))
                        }
                        containerClassName="mb-4"
                    />

                    <Text className="mb-2 text-xs text-kambista-muted">
                        Ponle nombre a tu cuenta
                    </Text>
                    <Input
                        placeholder="Escribe un alias"
                        value={formCuentaUsuario.alias}
                        onChangeText={(alias) =>
                            setFormCuentaUsuario((prev) => ({ ...prev, alias }))
                        }
                        containerClassName="mb-4"
                    />

                    <CheckboxField
                        checked={!!formCuentaUsuario.esPropietario}
                        onPress={() =>
                            setFormCuentaUsuario((prev) => ({
                                ...prev,
                                esPropietario: !prev.esPropietario,
                            }))
                        }
                        variant="navy"
                        className="mb-6 items-start"
                        label={
                            <Text className="flex-1 text-sm leading-5 text-kambista-navy">
                                Declaro que esta cuenta es mía
                            </Text>
                        }
                    />

                    <Button
                        variant="fill"
                        tone="cyanNavy"
                        onPress={handleSaveAccount}
                        disabled={
                            !userId ||
                            !formCuentaUsuario.numeroCuenta.trim() ||
                            !formCuentaUsuario.alias.trim() ||
                            !formCuentaUsuario.esPropietario ||
                            !hasValidEntityInCatalog
                        }
                    >
                        GUARDAR CUENTA
                    </Button>
                </View>
            </BottomSheetModal>

            <BottomSheetModal
                visible={accountTypeModalOpen}
                onRequestClose={() => setAccountTypeModalOpen(false)}
                showHeaderActions={false}
                title="Tipo de cuenta bancaria"
            >
                {["Ahorros", "Corriente"].map((t, index) => (
                    <View key={t}>
                        <Pressable
                            className="px-4 py-3"
                            onPress={() => {
                                setFormCuentaUsuario((prev) => ({ ...prev, tipoCuenta: t }));
                                setAccountTypeModalOpen(false);
                            }}
                        >
                            <Text className="text-left text-base text-kambista-navy">
                                {t}
                            </Text>
                        </Pressable>
                        {index < 1 ? (
                            <View className="mx-4 h-px bg-kambista-border" />
                        ) : null}
                    </View>
                ))}
            </BottomSheetModal>

            <BottomSheetModal
                visible={entityModalOpen}
                onRequestClose={() => setEntityModalOpen(false)}
                showHeaderActions={false}
                title="Entidad financiera"
                contentMaxHeight={SHEET_ENTITY_H}
            >
                {banks.length === 0 ? (
                    <Text className="px-4 py-6 text-left text-sm text-kambista-muted">
                        No hay bancos disponibles.
                    </Text>
                ) : (
                    banks.map((b, index) => (
                        <View key={b.id}>
                            <Pressable
                                className="px-4 py-3"
                                onPress={() => {
                                    setFormCuentaUsuario((prev) => ({
                                        ...prev,
                                        entidadId: b.id,
                                    }));
                                    setEntityModalOpen(false);
                                }}
                            >
                                <Text className="text-left text-base text-kambista-navy">
                                    {b.name}
                                </Text>
                            </Pressable>
                            {index < banks.length - 1 ? (
                                <View className="mx-4 h-px bg-kambista-border" />
                            ) : null}
                        </View>
                    ))
                )}
            </BottomSheetModal>
        </View>
    );
}
