module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/lib/supabase/server.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createClient",
    ()=>createClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/createServerClient.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-route] (ecmascript)");
;
;
async function createClient() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createServerClient"])(("TURBOPACK compile-time value", "https://wsaeldzhmxzjregeeire.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndzYWVsZHpobXh6anJlZ2VlaXJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg1MDYxNDMsImV4cCI6MjA5NDA4MjE0M30.tE58krJlobpKFdc4rT_HzjCibDRthzpIuX7zXvL_Vi0"), {
        cookies: {
            getAll () {
                return cookieStore.getAll();
            },
            setAll (cookiesToSet) {
                try {
                    cookiesToSet.forEach(({ name, value, options })=>cookieStore.set(name, value, options));
                } catch  {}
            }
        }
    });
}
}),
"[project]/src/app/api/cors.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "corsHeaders",
    ()=>corsHeaders
]);
function corsHeaders() {
    return {
        'Access-Control-Allow-Origin': process.env.FRONTEND_URL || 'http://localhost:3000',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Credentials': 'true'
    };
}
}),
"[project]/src/app/api/bookings/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "OPTIONS",
    ()=>OPTIONS,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/server.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$cors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/api/cors.ts [app-route] (ecmascript)");
;
;
;
async function OPTIONS() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({}, {
        headers: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$cors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["corsHeaders"])()
    });
}
async function GET(request) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Tidak terautentikasi'
        }, {
            status: 401,
            headers: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$cors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["corsHeaders"])()
        });
    }
    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
    let query = supabase.from('bookings').select(`
      *,
      profiles (id, full_name, phone),
      slots (id, start_time, end_time, quota)
    `).order('date', {
        ascending: false
    }).order('created_at', {
        ascending: false
    });
    if (profile?.role !== 'admin') {
        query = query.eq('user_id', user.id);
    }
    if (date) {
        query = query.eq('date', date);
    }
    const { data: bookings, error } = await query;
    if (error) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error.message
        }, {
            status: 500,
            headers: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$cors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["corsHeaders"])()
        });
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        bookings
    }, {
        headers: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$cors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["corsHeaders"])()
    });
}
async function POST(request) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Tidak terautentikasi'
        }, {
            status: 401,
            headers: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$cors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["corsHeaders"])()
        });
    }
    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
    if (profile?.role !== 'member') {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Hanya member yang bisa booking'
        }, {
            status: 403,
            headers: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$cors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["corsHeaders"])()
        });
    }
    const body = await request.json();
    const { slot_id, date } = body;
    if (!slot_id || !date) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'slot_id dan date wajib diisi'
        }, {
            status: 400,
            headers: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$cors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["corsHeaders"])()
        });
    }
    const today = new Date().toISOString().split('T')[0];
    if (date < today) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Tidak bisa booking di tanggal yang sudah lewat'
        }, {
            status: 400,
            headers: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$cors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["corsHeaders"])()
        });
    }
    const { data: existingBooking } = await supabase.from('bookings').select('id').eq('user_id', user.id).eq('slot_id', slot_id).eq('date', date).eq('status', 'active').single();
    if (existingBooking) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Kamu sudah punya booking aktif di slot ini'
        }, {
            status: 409,
            headers: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$cors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["corsHeaders"])()
        });
    }
    const { data: isAvailable, error: quotaError } = await supabase.rpc('check_slot_quota', {
        p_slot_id: slot_id,
        p_date: date
    });
    if (quotaError) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: quotaError.message
        }, {
            status: 500,
            headers: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$cors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["corsHeaders"])()
        });
    }
    if (!isAvailable) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Slot sudah penuh'
        }, {
            status: 409,
            headers: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$cors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["corsHeaders"])()
        });
    }
    const { data: booking, error } = await supabase.from('bookings').insert({
        user_id: user.id,
        slot_id,
        date,
        status: 'active'
    }).select(`*, slots (id, start_time, end_time)`).single();
    if (error) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error.message
        }, {
            status: 500,
            headers: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$cors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["corsHeaders"])()
        });
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        message: 'Booking berhasil',
        booking
    }, {
        status: 201,
        headers: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$cors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["corsHeaders"])()
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__13mgfbn._.js.map